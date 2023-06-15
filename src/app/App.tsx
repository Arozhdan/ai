import { Suspense, useEffect } from "react"
import AppRouter from "./providers/router/ui/AppRouter"
import { useDispatch, useSelector } from "react-redux"
import { getUserInited } from "@/entities/User/model/selectors/getUserInited"
import { userActions } from "@/entities/User"
import { Loader } from "@/shared/ui"
import { layoutActions } from "@/widget/Layout"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { queryActions } from "@/features/Query/model/slice/QuerySlice"

function App() {
  const inited = useSelector(getUserInited)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
    dispatch(layoutActions.initLayout())
    dispatch(queryActions.initTab())
  }, [dispatch])

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
