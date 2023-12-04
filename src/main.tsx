import React from "react"
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "../node_modules/bootstrap/dist/js/bootstrap.js"
import ReactDOM from "react-dom/client"
import store from "./redux/store.tsx"
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import App from "./App.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
