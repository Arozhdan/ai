import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import "./index.css"
import { ErrorBoundary } from "./providers/ErrorBoundary"
import { Provider } from "react-redux"
import { createReduxStore } from "./providers/StoreProvider"

const root = document.getElementById("root") || document.createElement("div")

const AppWithRouter = () => {
  const store = createReduxStore()
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </BrowserRouter>
  )
}

ReactDOM.createRoot(root).render(<AppWithRouter />)
