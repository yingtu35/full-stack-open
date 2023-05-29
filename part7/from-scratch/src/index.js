// for using async/await
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
// to support promises in IE browser
import PromisePolyfill from "promise-polyfill"

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

if (!window.Promise) {
    window.Promise = PromisePolyfill
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)