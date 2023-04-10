import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NoteForm from "./NoteForm"

describe("<NoteForm>", () => {
  test("update parent state and calls onsubmit, clear input value when createNote succeeds", async () => {
    const createNote = jest.fn(() => {return true})

    render(<NoteForm createNote={createNote} />)

    const user = userEvent.setup()

    const input = screen.getByRole("textbox")
    const button = screen.getByText("save")
    await user.type(input, "testing noteform")
    await user.click(button)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe("testing noteform")
    expect(input).toHaveValue("")
  })

  test("calls onsubmit and retain user input when createNote fails", async () => {
    const createNote = jest.fn(() => {return false})

    render(<NoteForm createNote={createNote} />)

    const user = userEvent.setup()

    const input = screen.getByRole("textbox")
    const button = screen.getByText("save")
    await user.type(input, "testing noteform")
    await user.click(button)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe("testing noteform")
    expect(input).toHaveValue("testing noteform")
  })
})