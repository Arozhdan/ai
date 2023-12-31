import { useSelector } from "react-redux"
import * as Yup from "yup"
import clsx from "clsx"
import { getSelectedPrompt } from "@/entities/Prompt"
import styles from "./Form.module.css"
import { Button, Select, TextArea } from "@/shared/ui"
import { useFormik } from "formik"
import { getNewQuery } from "../../model/selectors/getNewQuery/getNewQuery"
import { QueryRequest } from "../../model/types/Query"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { sendQuery } from "../../model/services/sendQuery/sendQuery"
import { useSetPrompt } from "../../lib/useSetPrompt"
import { getIsLoading } from "../../model/selectors/getIsLoading/getIsLoading"
import { RequestLoader } from "../RequestLoader/RequestLoader"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserData } from "@/entities/User"
import { FreetierUpgradeModal } from "@/entities/Subscribtion"

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

export const Form = ({ className }: FormProps) => {
  const prompt = useSelector(getSelectedPrompt)
  const dispatch = useAppDispatch()

  const newQuery = useSelector(getNewQuery)
  const isLoading = useSelector(getIsLoading)

  const user = useSelector(getUserData)

  if (!user) return null

  const subscription = user.subscription

  if (!subscription) return null

  const usage = user.currentUsage

  const limit = subscription.gptUsageLimit

  const [isModalOpen, setModalOpen] = useState(false)

  const { pathname } = useLocation()

  useEffect(() => {
    formik.resetForm()
  }, [pathname])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      formik.handleSubmit()
    }
  }

  const formik = useFormik({
    initialValues: {
      lang: newQuery?.lang || langOptions[0],
      input: "",
    },
    onSubmit: (values) => {
      console.log(values)
      if (!prompt) return

      if (limit && usage >= limit && limit !== -1) {
        setModalOpen(true)
        return
      }

      dispatch(
        sendQuery({
          title: prompt.attributes.name,
          query: useSetPrompt({
            prompt: prompt.attributes.prompt,
            lang: values.lang.value,
            input: values.input,
          }),
          relatedPrompt: prompt.id,
          input: values.input,
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
    <>
      <FreetierUpgradeModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
      <div className={styles.wrapper}>
        {isLoading && <RequestLoader />}
        <form onSubmit={formik.handleSubmit} className={clsx(styles.form, className)}>
          <div className={styles.inputContainer}>
            <TextArea
              value={formik.values.input}
              name='input'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={(formik.touched.input && formik.errors.input) || ""}
              placeholder={prompt?.attributes.example || "Контекст"}
              className={styles.input}
              onKeyDown={handleKeyDown}
              label={prompt?.attributes.helpText}
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
          </div>
          <div className={styles.actions}>
            <Button
              variant='ghost'
              type='button'
              size='small'
              onClick={handleClear}
              disabled={!formik.dirty || isLoading}
              tabIndex={2}
            >
              Очистить
            </Button>
            <Button variant='primary' size='small' type='submit' disabled={isLoading} tabIndex={1}>
              Сгенерировать
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
