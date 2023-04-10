const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const bcrypt = require("bcrypt")
const User = require("../models/user")
const helper = require("../tests/test.helper")

const api = supertest(app)

describe("when there is initially one user in db", () => {
    beforeEach(async () => {
        await User.deleteMany()

        const user = new User({
            username: "root",
            passwordHash: await bcrypt.hash("root", 10)
        })
        await user.save()
    })

    test("creation succeeds with a fresh username", async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: "newUser",
            name: "new User",
            password: "newpassword"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toHaveLength(userAtStart.length+1)

        const usernames = userAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test("creation fails with proper statuscode and message if username already taken", async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            username: "root",
            name: "SuperUser",
            password: "newpassword"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/)

        expect(result.body.error).toContain("expected `username` to be unique")

        const userAtEnd = await helper.usersInDb()
        expect(userAtEnd).toEqual(userAtStart)
    })
})

afterAll(() => {
    mongoose.connection.close()
})