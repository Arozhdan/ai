export enum SubscriptionStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
}

export interface Supscription {
  id: number
  name: string
  cost: number
  limitAutopayments: number | null
  autopaymentsNum: number | null
  dateFirstPayment: string
  dateLastPayment: string
  dateNextPayment: string
  currentAttemp: number
  paymentNum: number
  type: string
  actionCode: string
  paymentDate: string
  active: string
  createdAt: string
  updatedAt: string
  gptUsageLimit: number | null
  status: SubscriptionStatus
}
