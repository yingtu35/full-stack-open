import noteReducer from "./noteReducer"
import deepFreeze from "deep-freeze"

describe("noteReducer", () => {
    test("returns new state with the action NEW NOTE", () => {
        const state = []
        const action = {
            type: "NEW NOTE",
            payload: {
                content: "the app is in redux state",
                important: true,
                id: 1
            }
        }
        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.payload)
    })

    test.only("return new state with the action TOGGLE IMPORTANCE", () => {
        const state = [
            {
                content: 'the app state is in redux store',
                important: true,
                id: 1
            },
            {
                content: 'state changes are made with actions',
                important: false,
                id: 2
            }
        ]

        const action = {
            type: "TOGGLE IMPORTANCE",
            payload: {
                id: 2
            }
        }

        deepFreeze(state)
        const newState = noteReducer(state, action)

        expect(newState).toHaveLength(2)
        expect(newState).toContainEqual(state[0])
        expect(newState).toContainEqual({
            content: 'state changes are made with actions',
            important: true,
            id: 2
        })
    })
})
