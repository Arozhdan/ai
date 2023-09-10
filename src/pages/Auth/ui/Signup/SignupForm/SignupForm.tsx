import clsx from "clsx"
import styles from "./SignupForm.module.css"
import { Button, Input } from "@/shared/ui"
import { useFormik } from "formik"
import * as Yup from "yup"
import { useSelector } from "react-redux"
import { getIsRegisterLoading } from "@/features/RegisterLocal"
import { PageLoader } from "@/widget/PageLoader"

interface SignupFormProps {
  className?: string
  onSubmit: (values: { email: string; password: string; username: string }) => void
}

export const SignupForm = ({ className, onSubmit }: SignupFormProps) => {
  const isLoading = useSelector(getIsRegisterLoading)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      repeatPassword: "",
    },
    onSubmit: (values) => {
      onSubmit(values)
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Неверный формат почты").required("Поле обязательно"),
      password: Yup.string().required("Поле обязательно").min(6, "Минимум 6 символов"),
      username: Yup.string().required("Поле обязательно").min(6, "Минимум 6 символов"),
      repeatPassword: Yup.string()
        .required("Поле обязательно")
        .oneOf([Yup.ref("password")], "Пароли должны совпадать"),
    }),
  })
  return (
    <div className={clsx(styles.wrapper, className)}>
      {isLoading && <PageLoader />}
      <div className={styles.image}>
        <img src='/FormImage.jpg' alt='login' />
      </div>
      <form onSubmit={formik.handleSubmit} className={clsx(styles.SignupForm)}>
        <Input
          onChange={formik.handleChange}
          value={formik.values.username}
          id='username'
          label='Ваше имя'
          type='text'
          onBlur={formik.handleBlur}
          error={
            formik.touched.username && formik.errors.username ? formik.errors.username : undefined
          }
        />
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
        <Input
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          id='repeatPassword'
          label='Пароль'
          type='password'
          onBlur={formik.handleBlur}
          error={
            formik.touched.repeatPassword && formik.errors.repeatPassword
              ? formik.errors.repeatPassword
              : undefined
          }
        />

        <Button type='submit'>Зарегистрироваться</Button>
      </form>
    </div>
  )
}
