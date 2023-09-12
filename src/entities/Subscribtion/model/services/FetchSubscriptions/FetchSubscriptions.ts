import { createAsyncThunk } from "@reduxjs/toolkit"
import { ThunkConfig } from "@/app/providers/StoreProvider/config/StateSchema"
import { SubscriptionLink } from "../../types/SubscriptionLink"
import { subscriptionActions } from "../../slice/SubscriptionSlice"

interface SubscriptionLinkResponse {
  data: {
    id: number
    attributes: SubscriptionLink
  }[]
}

export const fetchSubscriptionLinks = createAsyncThunk<
  SubscriptionLink[],
  undefined,
  ThunkConfig<string>
>("subscription/getSubscrptionLinks", async (_props, thunkApi) => {
  const { extra, dispatch, rejectWithValue } = thunkApi

  try {
    const response = await extra.api.get<SubscriptionLinkResponse>("/prodamus-links")

    if (!response.data) {
      throw new Error()
    }

    dispatch(subscriptionActions.setSubscriptionsList(response.data.data.map((item) => item.attributes)))

    return response.data.data.map((item) => item.attributes)
  } catch (e) {
    console.log(e)
    return rejectWithValue("error")
  }
})
