import { lazy } from "react"

export const PaymentSuccessAsync = lazy(() => import("./PaymentSuccess"))
export const PaymentFailureAsync = lazy(() => import("./PaymentFailure"))
