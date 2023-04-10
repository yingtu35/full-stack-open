/* eslint-disable no-unused-vars */
import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Note from "./Note"

describe("<Note>", () => {
  test("render note contents", () => {
    const note = {
      content: "Component testing is done with react-testing library",
      important: true
    }

    // render(<Note note={note} />)

    // const element = screen.getByText("Component testing is done with react-testing library")
    // expect(element).toBeDefined()

    const { container } = render(<Note note={note} />)

    const div = container.querySelector(".note")

    screen.debug(div)
    expect(div).toHaveTextContent(
      "Component testing is done with react-testing library"
    )
  })

  test("clicking the button calls the event handler once", async () => {
    const note = {
      content: "Component testing is done with react-testing library",
      important: true
    }

    // create a mock function
    const mockHandler = jest.fn()

    render(
      <Note note={note} toggleImportance={mockHandler} />
    )
    // start a session
    const user = userEvent.setup()

    const button = screen.getByText("make not important")
    // simulate a click event
    await user.click(button)

    // access mock's metadata
    expect(mockHandler.mock.calls).toHaveLength(1)
    //   expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
