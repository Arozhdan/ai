import { Subscription } from "./Subscription.interface"
import { SubscriptionLink } from "./SubscriptionLink"

export interface SubscriptionSchema {
  subscriptionsList: SubscriptionLink[] | null
  subscriptionsListError: string | null
  isLoadingList: boolean
  userSubscription: Subscription | null
  userSubscriptionError: string | null
  isLoadingUserSubscription: boolean
}