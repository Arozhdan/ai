import axios from "axios"
import { toast } from "react-toastify"
import { JWT_LOCALSTORAGE_KEY } from "../const/localstorage"

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: localStorage.getItem(JWT_LOCALSTORAGE_KEY)
      ? `Bearer ${localStorage.getItem(JWT_LOCALSTORAGE_KEY)}`
      : "",
  },
})

// interceptors
$api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response.status === 401) {
      toast.error("Unauthorized")
      alert("Unauthorized, the page will be reloaded")
      localStorage.removeItem(JWT_LOCALSTORAGE_KEY)
      window.location.reload()
    }
    return Promise.reject(error)
  },
)
