import { About } from "@/pages/About"
import { ForgotPassword, Login, Signup, Success } from "@/pages/Auth"
import { Chat } from "@/pages/Chat"
import { Favorites } from "@/pages/Favorites"
import { History } from "@/pages/History"
import { Main } from "@/pages/Main"
import { PaymentFailure, PaymentSuccess } from "@/pages/PaymentStatus"
import { Profile } from "@/pages/Profile"
import { Prompt } from "@/pages/Prompt"
import { Subscribtion } from "@/pages/Subscribtion"
import { RouteProps } from "react-router-dom"

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean
}

export enum AppRoutes {
  MAIN = "main",
  ABOUT = "about",
  HISTORY = "history",
  FAVORITES = "favorites",
  LOGIN = "login",
  SUCCESS = "success",
  FORGOT_PASSWORD = "forgot_password",
  PROFILE = "profile",
  SIGNUP = "signup",
  PROMPT = "prompt/:slug",
  CHAT = "chat",
  SUBSCRIPTION = "subscription",
  PAYMENT_SUCCESS = "payment_success",
  PAYMENT_FAILURE = "payment_failure",
  // last
  NOT_FOUND = "not_found",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.ABOUT]: "/about",
  [AppRoutes.HISTORY]: "/history",
  [AppRoutes.FAVORITES]: "/favorites",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.FORGOT_PASSWORD]: "/forgot-password",
  [AppRoutes.SUCCESS]: "/success",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.SIGNUP]: "/signup",
  [AppRoutes.PROMPT]: "/prompts/:slug",
  [AppRoutes.CHAT]: "/chat",
  [AppRoutes.SUBSCRIPTION]: "/subscription",
  [AppRoutes.PAYMENT_SUCCESS]: "/payment-success",
  [AppRoutes.PAYMENT_FAILURE]: "/payment-failure",
  // последний
  [AppRoutes.NOT_FOUND]: "*",
}

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: RoutePath.main,
    authOnly: true,
    element: <Main />,
  },
  [AppRoutes.ABOUT]: {
    path: RoutePath.about,
    authOnly: true,
    element: <About />,
  },
  [AppRoutes.HISTORY]: {
    path: RoutePath.history,
    authOnly: true,
    element: <History />,
  },
  [AppRoutes.FAVORITES]: {
    path: RoutePath.favorites,
    authOnly: true,
    element: <Favorites />,
  },
  [AppRoutes.LOGIN]: {
    path: RoutePath.login,
    authOnly: false,
    element: <Login />,
  },
  [AppRoutes.FORGOT_PASSWORD]: {
    path: RoutePath.forgot_password,
    authOnly: false,
    element: <ForgotPassword />,
  },
  [AppRoutes.SUCCESS]: {
    path: RoutePath.success,
    authOnly: false,
    element: <Success />,
  },
  [AppRoutes.PROFILE]: {
    path: RoutePath.profile,
    authOnly: true,
    element: <Profile />,
  },
  [AppRoutes.SIGNUP]: {
    path: RoutePath.signup,
    authOnly: false,
    element: <Signup />,
  },
  [AppRoutes.PROMPT]: {
    path: RoutePath["prompt/:slug"],
    authOnly: true,
    element: <Prompt />,
  },
  [AppRoutes.CHAT]: {
    path: RoutePath.chat,
    authOnly: true,
    element: <Chat />,
  },
  [AppRoutes.SUBSCRIPTION]: {
    path: RoutePath.subscription,
    authOnly: true,
    element: <Subscribtion />,
  },
  [AppRoutes.PAYMENT_SUCCESS]: {
    path: RoutePath.payment_success,
    element: <PaymentSuccess />,
  },
  [AppRoutes.PAYMENT_FAILURE]: {
    path: RoutePath.payment_failure,
    element: <PaymentFailure />,
  },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: RoutePath.not_found,
    element: (
      <>
        <h1>404</h1>
      </>
    ),
  },
}
