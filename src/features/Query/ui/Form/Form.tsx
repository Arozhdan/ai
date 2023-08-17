import { useSelector } from "react-redux"
import * as Yup from "yup"
import clsx from "clsx"
import { getSelectedPrompt } from "@/entities/Prompt"
import styles from "./Form.module.css"
import { Button, Input, Select } from "@/shared/ui"
import { useFormik } from "formik"
import { getNewQuery } from "../../model/selectors/getNewQuery/getNewQuery"
import { QueryRequest } from "../../model/types/Query"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { sendQuery } from "../../model/services/sendQuery/sendQuery"
import { useSetPrompt } from "../../lib/useSetPrompt"
import { getIsLoading } from "../../model/selectors/getIsLoading/getIsLoading"
import { RequestLoader } from "../RequestLoader/RequestLoader"
import { useLocation } from "react-router-dom"
import { useEffect } from "react"

interface FormProps {
  className?: string
}

const langOptions = [
  {
    label: "Русский",
    value: "russian",
  },
  {
    label: "Английский",
    value: "english",
  },
]

const tovOptions = [
  {
    label: "Профессиональный",
    value: "professional",
  },
  {
    label: "Повседневный",
    value: "casual",
  },
  {
    label: "Неформальный",
    value: "informal",
  },
  {
    label: "Серьезный",
    value: "serious",
  },
  {
    label: "Смешной",
    value: "funny",
  },
  {
    label: "Уважительный",
    value: "respectful",
  },
  {
    label: "Дерзкий",
    value: "rude",
  },
  {
    label: "Сдержанный",
    value: "reserved",
  },
  {
    label: "Восторженный",
    value: "enthusiastic",
  },
  {
    label: "Игривый",
    value: "playful",
  },
  {
    label: "Саркастический",
    value: "sarcastic",
  },
  {
    label: "Остроумный",
    value: "witty",
  },
  {
    label: "Романтичный",
    value: "romantic",
  },
  {
    label: "Креативный",
    value: "creative",
  },
  {
    label: "Прямолинейный",
    value: "straightforward",
  },
  {
    label: "Грубый",
    value: "blunt",
  },
  {
    label: "Заботливый",
    value: "caring",
  },
  {
    label: "Авторитетный",
    value: "authoritative",
  },
  {
    label: "Информационный",
    value: "informative",
  },
  {
    label: "Позитивный",
    value: "positive",
  },
  {
    label: "Провокационный",
    value: "provocative",
  },
]

export const Form = ({ className }: FormProps) => {
  const prompt = useSelector(getSelectedPrompt)
  const dispatch = useAppDispatch()

  const newQuery = useSelector(getNewQuery)
  const isLoading = useSelector(getIsLoading)

  const { pathname } = useLocation()

  useEffect(() => {
    formik.resetForm()
  }, [pathname])

  const formik = useFormik({
    initialValues: {
      tov: newQuery?.tov || tovOptions[0],
      lang: newQuery?.lang || langOptions[0],
      input: "",
    },
    onSubmit: (values) => {
      console.log(values)
      if (!prompt) return
      dispatch(
        sendQuery({
          title: prompt.attributes.name,
          query: useSetPrompt({
            prompt: prompt.attributes.prompt,
            tov: values.tov.value,
            lang: values.lang.value,
            input: values.input,
          }),
          relatedPrompt: prompt.id,
          input: values.input,
          tov: values.tov.value as unknown as QueryRequest["tov"],
          lang: values.lang.value as unknown as QueryRequest["lang"],
        }),
      )
    },

    validationSchema: Yup.object({
      input: Yup.string().required("Поле обязательно"),
    }),
  })
  if (!prompt) return null

  const handleClear = () => {
    formik.resetForm()
  }

  return (
    <div className={styles.wrapper}>
      {isLoading && <RequestLoader />}
      <form onSubmit={formik.handleSubmit} className={clsx(styles.form, className)}>
        <div className={styles.inputContainer}>
          <Input
            value={formik.values.input}
            name='input'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={(formik.touched.input && formik.errors.input) || ""}
            placeholder={prompt?.attributes.helpText}
            variant='outlined'
            className={styles.input}
            label='Контекст'
          />
          <Select
            options={langOptions}
            activeOption={formik.values.lang}
            label='Язык'
            className={styles.lang}
            onChange={(value) => {
              formik.setFieldValue("lang", value)
            }}
          />
          <Select
            options={tovOptions}
            activeOption={formik.values.tov}
            label='Тон и стиль'
            className={styles.tov}
            onChange={(value) => formik.setFieldValue("tov", value)}
          />
        </div>
        <div className={styles.actions}>
          <Button
            variant='ghost'
            size='small'
            onClick={handleClear}
            disabled={!formik.dirty || isLoading}
          >
            Очистить
          </Button>
          <Button variant='primary' size='small' type='submit' disabled={isLoading}>
            Сгенерировать
          </Button>
        </div>
      </form>
    </div>
  )
}
