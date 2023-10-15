import clsx from "clsx"
import styles from "./ResetPasswordForm.module.css"
import { Button, Input } from "@/shared/ui"
import { useFormik } from "formik"
import * as Yup from "yup"
import { getLoginIsLoading } from "@/features/AuthByUserName"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

interface ResetPasswordFormProps {
  className?: string
  onSubmit: (values: { password: string }) => void
}

export const ResetPasswordForm = ({ className, onSubmit }: ResetPasswordFormProps) => {
  const isLoading = useSelector(getLoginIsLoading)

  const formik = useFormik({
    initialValues: {
      password: "",
      repeatPassword: "",
    },
    onSubmit: onSubmit,
    validationSchema: Yup.object({
      password: Yup.string().required("Поле обязательно").min(6, "Минимальная длина 6 символов"),
      repeatPassword: Yup.string()
        .required("Поле обязательно")
        .oneOf([Yup.ref("password")], "Пароли не совпадают"),
    }),
  })
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div>
        <form onSubmit={formik.handleSubmit} className={clsx(styles.LoginForm)}>
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
          <Input
            onChange={formik.handleChange}
            value={formik.values.repeatPassword}
            id='repeatPassword'
            label='Повторите пароль'
            type='password'
            onBlur={formik.handleBlur}
            error={
              formik.touched.repeatPassword && formik.errors.repeatPassword
                ? formik.errors.repeatPassword
                : undefined
            }
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
