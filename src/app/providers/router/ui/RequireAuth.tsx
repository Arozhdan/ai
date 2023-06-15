import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { RoutePath } from "../config/routerConfig"
import { getUserAuthData } from "@/entities/User"

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useSelector(getUserAuthData)
  const location = useLocation()

  if (!auth.jwt) {
    return <Navigate to={RoutePath.login} state={{ from: location }} replace />
  }

  return children
}
