import clsx from "clsx"
import styles from "./SignupForm.module.css"
import { Button, Input } from "@/shared/ui"
import { useFormik } from "formik"
import * as Yup from "yup"

interface SignupFormProps {
  className?: string
}

export const SignupForm = ({ className }: SignupFormProps) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      console.log(values)
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Неверный формат почты").required("Поле обязательно"),
      password: Yup.string().required("Поле обязательно").min(6, "Минимум 6 символов"),
    }),
  })
  return (
    <div className={clsx(styles.wrapper, className)}>
      <div className={styles.image}>
        <img src='/FormImage.jpg' alt='login' />
      </div>
      <form onSubmit={formik.handleSubmit} className={clsx(styles.SignupForm)}>
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
        <Button onClick={() => formik.handleSubmit()} type='submit'>
          Войти
        </Button>
      </form>
    </div>
  )
}
