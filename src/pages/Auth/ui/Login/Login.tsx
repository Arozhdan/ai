import { LogoExpanded, Typography } from "@/shared/ui"
import styles from "./Login.module.css"
import { Link, useNavigate } from "react-router-dom"
import { LoginForm } from "./LoginForm/LoginForm"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useCallback, useEffect } from "react"
import { loginByUsername } from "@/features/AuthByUserName/model/services/LoginByUserName/LoginByUserName"
import { getUserAuthData, userActions } from "@/entities/User"
import { useSelector } from "react-redux"
import { FreetierUpgradeModal, SubscribeModal } from "@/entities/Subscribtion"

const Login = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const auth = useSelector(getUserAuthData)

  useEffect(() => {
    if (auth.jwt) {
      navigate("/")
    }
  }, [auth.jwt])

  const handleSubmit = useCallback(
    async (values: { email: string; password: string }) => {
      const result = await dispatch(
        loginByUsername({
          username: values.email,
          password: values.password,
        }),
      )
      if (result.meta.requestStatus === "fulfilled") {
        dispatch(userActions.initAuthData())
        if (!auth.jwt) return
        navigate("/")
      }
    },
    [auth.jwt],
  )

  return (
    <div className={styles.login}>
      <div className={styles.title}>
        <Typography variant='h1' className='mr-4'>
          Добро пожаловать в
        </Typography>
        <LogoExpanded className='mt-2' />
      </div>
      <Typography variant='p' as='h2' className='mt-4 text-center max-w-md mx-auto'>
        Войдите в свой аккаунт чтобы продолжить или <Link to='/signup'>создайте новый</Link>
      </Typography>
      <div className={styles.formWrapper}>
        <LoginForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default Login
