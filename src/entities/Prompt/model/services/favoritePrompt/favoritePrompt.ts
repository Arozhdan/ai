import { createAsyncThunk } from "@reduxjs/toolkit"
import { Prompt } from "../../types/Prompt"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { userActions } from "@/entities/User"
import { toast } from "react-toastify"
export const addToFavorites = createAsyncThunk<
  undefined,
  Prompt["attributes"],
  ThunkConfig<string>
>("prompt/addToFavorites", async (props, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi

  try {
    const promptId = props.id
    if (!promptId) return

    dispatch(userActions.addToFavorites(props))

    await extra.api.post("/prompt-favorite", {
      promptId,
    })
    toast.success("Успешно добавлено в избранное")
  } catch (e) {
    console.log(e)
    toast.error("Ошибка при добавлении в избранное")
    dispatch(userActions.removeFromFavorites(props))
    return rejectWithValue("error")
  }
})

export const removeFromFavorites = createAsyncThunk<
  undefined,
  Prompt["attributes"],
  ThunkConfig<string>
>("prompt/removeFromFavorites", async (props, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi

  try {
    const promptId = props.id
    if (!promptId) return

    dispatch(userActions.removeFromFavorites(props))

    await extra.api.post("/prompt-unfavorite", {
      promptId,
    })
    toast.success("Успешно удалено из избранного")
  } catch (e) {
    console.log(e)
    dispatch(userActions.addToFavorites(props))
    toast.error("Ошибка при удалении из избранного")
    return rejectWithValue("error")
  }
})
