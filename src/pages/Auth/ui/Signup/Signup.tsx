import { LogoExpanded, Typography } from "@/shared/ui"
import styles from "./Signup.module.css"
import { Link, useNavigate } from "react-router-dom"
import { SignupForm } from "./SignupForm/SignupForm"
import { useCallback } from "react"
import { regiserLocal } from "@/features/RegisterLocal/model/services/RegisterLocal/RegisterLocal"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { toast } from "react-toastify"

const Signup = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleSubmit = useCallback(
    async (values: { email: string; password: string; username: string }) => {
      const result = await dispatch(
        regiserLocal({
          username: values.username,
          password: values.password,
          email: values.email,
        }),
      )
      if (result.meta.requestStatus === "fulfilled") {
        toast.info("Проверьте почту для подтверждения регистрации")
        navigate("/")
      }
      if (result.meta.requestStatus === "rejected") {
        console.log(result)
      }
    },
    [],
  )
  return (
    <div className={styles.Signup}>
      <div className={styles.title}>
        <Typography variant='h1' className='mr-4'>
          Добро пожаловать в
        </Typography>
        <LogoExpanded className='mt-2' />
      </div>
      <Typography variant='p' as='h2' className='mt-4 text-center max-w-md mx-auto'>
        Уже есть аккаунт? Тогда проосто <Link to='/login'>войдите</Link> в систему. Если нет, то
        зарегистрируйтесь
      </Typography>
      <div className={styles.formWrapper}>
        <SignupForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}

export default Signup
