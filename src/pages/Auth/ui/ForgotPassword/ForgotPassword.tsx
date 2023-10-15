import { LogoExpanded, Typography } from "@/shared/ui"
import styles from "./ForgotPassword.module.css"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { ForgotPasswordForm } from "./ForgotPasswordForm/ForgotPasswordForm"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useCallback, useEffect, useState } from "react"
import { forgotPasswordRequest, resetPassword } from "@/features/AuthByUserName"
import { ResetPasswordForm } from "./ResetPasswordForm/ResetPasswordForm"

const ForgotPassword = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const [isReset, setIsReset] = useState(false)
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const code = query.get("code")
    if (code) {
      setIsReset(true)
    }
  }, [])

  const handleSubmit = useCallback(async (values: { email: string; password?: string }) => {
    dispatch(forgotPasswordRequest({ email: values.email }))
    navigate("/login")
  }, [])

  const handleReset = useCallback(async (values: { password: string }) => {
    const query = new URLSearchParams(location.search)
    const code = query.get("code")
    if (code) {
      dispatch(resetPassword({ code, password: values.password }))
      navigate("/login")
    }
  }, [])

  return (
    <div className={styles.login}>
      <div className={styles.title}>
        <Typography variant='h1' className='mr-4'>
          Забыли пароль?
        </Typography>
      </div>
      <Typography variant='p' as='h2' className='mt-4 text-center max-w-md mx-auto'>
        Введите свою почту и мы отправим вам ссылку для восстановления пароля или{" "}
        <Link to='/login'>Войдите в свой аккаунт</Link> чтобы продолжить
      </Typography>
      <div className={styles.formWrapper}>
        {isReset ? (
          <ResetPasswordForm onSubmit={handleReset} />
        ) : (
          <ForgotPasswordForm onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
