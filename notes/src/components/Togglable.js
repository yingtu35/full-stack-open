import { useState, forwardRef, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible? "none" : "" }
  const showWhenVisible = { display: visible? "" : "none" }


  const toggleVisibility = () => {
    setVisible(visible => !visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  }, [])
  return (
    <div>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonLabel}</button>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
      </div>
      <button style={showWhenVisible} onClick={toggleVisibility}>Cancel</button>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

Togglable.displayName = "Togglable"

export default Togglable