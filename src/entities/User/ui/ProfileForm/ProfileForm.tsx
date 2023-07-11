import * as Yup from "yup"
import { Button, Input, Typography } from "@/shared/ui"
import styles from "./ProfileForm.module.css"
import { useSelector } from "react-redux"
import { getUserData } from "../.."
import { useFormik } from "formik"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"

export const ProfileForm = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(getUserData)
  // const userImage = user?.image?.url ? __SERVER__ + user?.image?.url : null
  const formik = useFormik({
    initialValues: {
      username: user?.username,
      email: user?.email,
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Обязательное поле"),
      email: Yup.string().email("Неверный формат email").required("Обязательное поле"),
      password: Yup.string().min(6, "Минимум 6 символов"),
      repeatPassword: Yup.string().oneOf([Yup.ref("password")], "Пароли не совпадают"),
    }),
    onSubmit: (values) => {
      if (values.password && !values.repeatPassword) {
        formik.setErrors({ repeatPassword: "Повторите пароль" })
        return
      }
      formik.resetForm()
    },
  })
  return (
    <div className={styles.page}>
      <Typography variant='h2' className='text-primary row-start-1'>
        Профиль
      </Typography>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <Input
            id='username'
            label='Имя пользователя'
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.errors.username}
          />
          <Input
            id='email'
            label='Email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
          <Input
            id='password'
            label='Изменить пароль'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
          <Input
            id='repeatPassword'
            label='Повторите пароль'
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
          />
        </div>
        <div className={styles.actions}>
          <Button
            size='small'
            variant='ghost'
            disabled={!formik.dirty}
            onClick={() => formik.resetForm()}
          >
            Отменить
          </Button>
          <Button type='submit' disabled={!formik.dirty}>
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
