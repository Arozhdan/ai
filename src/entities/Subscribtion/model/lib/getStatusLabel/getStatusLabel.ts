import { SubscriptionStatus } from "../../types/Subscription.interface"

enum SubscriptionStatusLabels {
  ACTIVE = "Активна",
  SUSPENDED = "Приостановлена",
}

export const getSubscrptionStatusLabel = (status: SubscriptionStatus): string => {
  if (!status) return "Не определено"
  const labels = {
    active: SubscriptionStatusLabels.ACTIVE,
    suspended: SubscriptionStatusLabels.SUSPENDED,
  }
  return labels[status]
}
