import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SubscriptionSchema } from "../types/SubscriptionSchema"
import { Subscription } from "../types/Subscription.interface"
import { SubscriptionLink } from "../types/SubscriptionLink"
import { fetchSubscriptionLinks } from "../services/FetchSubscriptions/FetchSubscriptions"

const initialState: SubscriptionSchema = {
  subscriptionsList: null,
  subscriptionsListError: null,
  isLoadingList: false,
  userSubscription: null,
  userSubscriptionError: null,
  isLoadingUserSubscription: false,
}

export const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSubscriptionsList: (state, action: PayloadAction<SubscriptionLink[]>) => {
      state.subscriptionsList = action.payload
    },
    setSubscriptionsListError: (state, action: PayloadAction<string>) => {
      state.subscriptionsListError = action.payload
    },
    setIsLoadingList: (state, action: PayloadAction<boolean>) => {
      state.isLoadingList = action.payload
    },
    setUserSubscription: (state, action: PayloadAction<Subscription>) => {
      state.userSubscription = action.payload
    },
    setUserSubscriptionError: (state, action: PayloadAction<string>) => {
      state.userSubscriptionError = action.payload
    },
    setIsLoadingUserSubscription: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUserSubscription = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSubscriptionLinks.pending, (state) => {
      state.subscriptionsListError = null
      state.isLoadingList = true
    })
    builder.addCase(fetchSubscriptionLinks.fulfilled, (state) => {
      state.isLoadingList = false
    })
    builder.addCase(fetchSubscriptionLinks.rejected, (state, action) => {
      state.isLoadingList = false
      state.subscriptionsListError = action.payload as string
    })
  }
})

export const { actions: subscriptionActions } = subscriptionSlice
export const { reducer: subscriptionReducer } = subscriptionSlice
