import clsx from "clsx"
import styles from "./ForgotPasswordForm.module.css"
import { Button, Input } from "@/shared/ui"
import { useFormik } from "formik"
import * as Yup from "yup"
import { getLoginIsLoading, getLoginUsername } from "@/features/AuthByUserName"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

interface ForgotPasswordFormProps {
  className?: string
  onSubmit: (values: { email: string }) => void
}

export const ForgotPasswordForm = ({ className, onSubmit }: ForgotPasswordFormProps) => {
  const username = useSelector(getLoginUsername)
  const isLoading = useSelector(getLoginIsLoading)

  const formik = useFormik({
    initialValues: {
      email: username,
    },
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      email: Yup.string().email("Неверный формат почты").required("Поле обязательно"),
    }),
  })
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div>
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
          <Button disabled={isLoading} variant='primary' type='submit'>
            Восстановить пароль
          </Button>
        </form>
        <div className={styles.forgotPassword}>
          <Link to='/login'>Войти в аккаунт</Link>
        </div>
      </div>
      <div className={styles.image}>
        <img src='/FormImage.jpg' alt='login' />
      </div>
    </div>
  )
}
