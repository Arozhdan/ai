import clsx from "clsx"
import styles from "./LoginForm.module.css"
import { Button, Input } from "@/shared/ui"
import { useFormik } from "formik"
import * as Yup from "yup"
import { getLoginIsLoading, getLoginPassword, getLoginUsername } from "@/features/AuthByUserName"
import { useSelector } from "react-redux"

interface LoginFormProps {
  className?: string
  onSubmit: (values: { email: string; password: string }) => void
}

export const LoginForm = ({ className, onSubmit }: LoginFormProps) => {
  const username = useSelector(getLoginUsername)
  const password = useSelector(getLoginPassword)
  const isLoading = useSelector(getLoginIsLoading)

  const formik = useFormik({
    initialValues: {
      email: username,
      password: password,
    },
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email("Неверный формат почты").required("Поле обязательно"),
      password: Yup.string().required("Поле обязательно").min(6, "Минимум 6 символов"),
    }),
  })
  return (
    <div className={clsx(styles.wrapper, className)}>
      <form onSubmit={formik.handleSubmit} className={clsx(styles.LoginForm)}>
        <Input
          onChange={formik.handleChange}
          value={formik.values.email}
          id='email'
          label='Ваша почта'
          type='email'
          onBlur={formik.handleBlur}
          error={formik.touched.email && formik.errors.email ? formik.errors.email : undefined}
        />
        <Input
          onChange={formik.handleChange}
          value={formik.values.password}
          id='password'
          label='Пароль'
          type='password'
          onBlur={formik.handleBlur}
          error={
            formik.touched.password && formik.errors.password ? formik.errors.password : undefined
          }
        />
        <Button disabled={isLoading} variant='primary' type='submit'>
          Войти
        </Button>
      </form>
      <div className={styles.image}>
        <img src='/FormImage.jpg' alt='login' />
      </div>
    </div>
  )
}
