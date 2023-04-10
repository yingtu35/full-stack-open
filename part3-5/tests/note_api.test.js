const supertest = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")
const Note = require("../models/note")
const helper = require("./test.helper")

// create a superagent object
const api = supertest(app)


beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(helper.initialNotes)

    // // save each note in order
    // for (const note of helper.initialNotes) {
    //     let noteObject = new Note(note)
    //     await noteObject.save()
    //     console.log("note saved")
    // }

    // transform an array of promise into a single promise, fulfilled when all promises resolved
    // promise resolve might not in order
    // const noteObjects = helper.initialNotes.map(note => new Note(note))
    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray)

    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()
    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
})

describe("when there are initially some notes saved", () => {
    test("notes are rendered as json", async () => {
        console.log("fetch notes")
        await api
            .get("/api/notes")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    })

    test("all notes are returned", async () => {
        const response = await api.get("/api/notes")
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })

    test("the order of the notes is as expected", async () => {
        const response = await api.get("/api/notes")
        expect(response.body[0].content).toBe(helper.initialNotes[0].content)
    })

    test("the specific node is with returned notes", async () => {
        const response = await api.get("/api/notes")
        const content = response.body.map(note => note.content)
        expect(content).toContain("Browser can execute only JavaScript")
    })
})

describe("viewing a specific node", () => {
    test("succeeds with a valid id", async () => {
        const response = await api.get("/api/notes")
        const firstNote = response.body[0]

        const returnedNote = await api
            .get(`/api/notes/${firstNote.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        expect(returnedNote.body).toEqual(firstNote)
    })

    test("returns 404 with a non-existing valid id", async () => {
        const nonexistingId = await helper.nonexistingId()
        console.log(nonexistingId)

        await api
            .get(`/api/notes/${nonexistingId}`)
            .expect(404)
    })

    test("returns 400 with a invalid id", async () => {
        const invalidId = "123"

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe("adding a new note", () => {
    test("succeeds with valid form", async () => {
        const newNote = {
            content: "async/await simplifies async calls",
            important: true
        }

        await api
            .post("/api/notes")
            .send(newNote)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const response = await api.get("/api/notes")
        const contents = response.body.map(r => r.content)

        expect(contents).toHaveLength(helper.initialNotes.length+1)
        expect(contents).toContain("async/await simplifies async calls")
    })

    test("fails with the note without content", async () => {
        const newNote = {
            important: true
        }

        await api
            .post("/api/notes")
            .send(newNote)
            .expect(400)

        const response = await api.get("/api/notes")

        expect(response.body).toHaveLength(helper.initialNotes.length)
    }, 100000)
})

describe("deleting a note", () => {
    test("succeeds and return 204", async () => {
        const response = await api.get("/api/notes")
        const firstNote = response.body[0]

        await api
            .delete(`/api/notes/${firstNote.id}`)
            .expect(204)
        const responseAfter = await api.get("/api/notes")
        const contents = responseAfter.body.map(note => note.content)

        expect(contents).toHaveLength(helper.initialNotes.length-1)
        expect(contents).not.toContain(firstNote.content)
    })

})

describe("updating a note", () => {
    test("succeeds when new note is provided", async () => {
        const response = await api.get("/api/notes")
        const firstNote = response.body[0]

        const newContent = "The content is updated"
        const newFirstNote = {
            ...firstNote,
            content: newContent
        }

        await api
            .put(`/api/notes/${firstNote.id}`)
            .send(newFirstNote)
            .expect(200)
            .expect("Content-Type", /application\/json/)

        const responseAfter = await api.get("/api/notes")
        const contents = responseAfter.body.map(r => r.content)
        expect(contents).toHaveLength(helper.initialNotes.length)
        expect(contents).toContain(newFirstNote.content)
        expect(contents).not.toContain(firstNote.content)
    })

    test("fails with 404 with non-existing valid id", async () => {
        const nonexistingId = await helper.nonexistingId()
        const newNote = {
            content: "Can't update a nonexisting note"
        }

        await api
            .put(`/api/notes/${nonexistingId}`)
            .send(newNote)
            .expect(404)
    })
})




afterAll(() => {
    mongoose.connection.close()
})