import { Suspense, useEffect } from "react"
import AppRouter from "./providers/router/ui/AppRouter"
import { useSelector } from "react-redux"
import { getUserInited } from "@/entities/User/model/selectors/getUserInited"
import { getMe, userActions } from "@/entities/User"
import { Loader } from "@/shared/ui"
import { layoutActions } from "@/widget/Layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { queryActions } from "@/features/Query/model/slice/QuerySlice"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"

function App() {
  const inited = useSelector(getUserInited)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
    dispatch(getMe())
    dispatch(layoutActions.initLayout())
    dispatch(queryActions.initTab())
  }, [])

  return (
    <Suspense fallback={<Loader />}>
      {inited && (
        <>
          <AppRouter />
          <ToastContainer position='bottom-right' />
        </>
      )}
    </Suspense>
  )
}

export default App
