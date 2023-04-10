import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Togglable from "./Togglable"

describe("<Togglable>", () => {
  let container

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="show">
        <div className="testDiv">
                    test content
        </div>
      </Togglable>
    ).container
  })

  test("render its children", async () => {
    await screen.findAllByText("test content")
  })

  test("hide the children at start", () => {
    const children = container.querySelector(".togglableContent")
    expect(children).toHaveStyle("display: none")
  })

  test("show the children when the show button is clicked once", async () => {
    const user = userEvent.setup()

    const button = screen.getByText("show")
    await user.click(button)

    const children = container.querySelector(".togglableContent")
    expect(children).not.toHaveStyle("display: none")
  })

  test("hide the children again when the cancel button is clicked", async () => {
    const user = userEvent.setup()

    const showButton = screen.getByText("show")
    await user.click(showButton)

    const cancelButton = screen.getByText("Cancel")
    await user.click(cancelButton)

    const children = container.querySelector(".togglableContent")
    expect(children).toHaveStyle("display: none")
  })
})