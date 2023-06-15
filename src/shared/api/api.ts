import axios from "axios"
import { JWT_LOCALSTORAGE_KEY } from "../const/localstorage"

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: `Bearer ${localStorage.getItem(JWT_LOCALSTORAGE_KEY)}`,
  },
})
