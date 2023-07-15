const { GraphQLError } = require("graphql")
const Person = require("./models/person")
const User = require("./models/user")
const jwt = require("jsonwebtoken")
const { PubSub } = require("graphql-subscriptions")

const pubsub = new PubSub()

const resolvers = {
  Query: {
    personCount: () => Person.collection.countDocuments(),
    allPersons: async (root, args) => {
      if (!args.phone) {
        const result = await Person.find({})
        return result
      }
      return Person.find({ phone: { $exists: args.phone === "YES" } })
    },
    findPerson: async (root, args) => Person.findOne({ name: args.name }),
    allUser: async () => User.find({}),
    curUser: (root, args, context) => context.curUser,
  },

  Mutation: {
    addPerson: async (root, args, context) => {
      const curUser = context.curUser
      if (!curUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 401 },
          },
        })
      }
      const isExists = await Person.exists({ name: args.name })
      if (isExists) {
        throw new GraphQLError("Name must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        })
      }
      const newPerson = new Person({ ...args })
      try {
        await newPerson.save()
        curUser.friends = curUser.friends.concat(newPerson)
        await curUser.save()
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        })
      }

      pubsub.publish("PERSON_ADDED", { personAdded: newPerson })
      return newPerson
    },
    editNumber: async (root, args) => {
      const personToChange = await Person.findOne({ name: args.name })
      if (!personToChange) {
        throw new GraphQLError(`Cannot find person ${args.name}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        })
      }

      personToChange.phone = args.phone
      try {
        await personToChange.save()
      } catch (error) {
        throw new GraphQLError("Saving person failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.phone,
            error,
          },
        })
      }
      return personToChange
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
      } catch (error) {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        })
      }
      return user
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== "secret") {
        throw new GraphQLError("Invalid username or password", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        })
      }
      const payload = {
        username: user.username,
        id: user._id,
      }
      const expiresIn = 60 * 60
      const token = jwt.sign(payload, process.env.SECRET, {
        expiresIn: expiresIn,
      })
      return { value: token, expiresIn: expiresIn }
    },
    addAsFriend: async (root, args, { curUser }) => {
      if (!curUser) {
        throw new GraphQLError("Not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
            http: { status: 401 },
          },
        })
      }
      const person = await Person.findOne({ name: args.name })
      if (!person) {
        throw new GraphQLError(`Cannot find person ${args.name}`, {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        })
      }
      const isFriend = curUser.friends
        .map((friend) => friend._id.toString())
        .includes(person._id.toString())
      if (!isFriend) {
        curUser.friends = curUser.friends.concat(person)
        return curUser.save()
      }
    },
  },

  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator("PERSON_ADDED"),
    },
  },

  Person: {
    address: (root) => ({
      street: root.street,
      city: root.city,
    }),
  },
}

module.exports = resolvers
