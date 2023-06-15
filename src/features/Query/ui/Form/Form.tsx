import { useSelector } from "react-redux"
import * as Yup from "yup"
import clsx from "clsx"
import { getSelectedPrompt } from "@/entities/Prompt"
import styles from "./Form.module.css"
import { Button, Input, Loader, Select } from "@/shared/ui"
import { useFormik } from "formik"
import { getNewQuery } from "../../model/selectors/getNewQuery/getNewQuery"
import { QueryRequest } from "../../model/types/Query"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { sendQuery } from "../../model/services/sendQuery/sendQuery"
import { useSetPrompt } from "../../lib/useSetPrompt"
import { getIsLoading } from "../../model/selectors/getIsLoading/getIsLoading"
import { RequestLoader } from "../RequestLoader/RequestLoader"

interface FormProps {
  className?: string
}

const langOptions = ["RUSSIAN", "ENGLISH"]
const tovOptions = ["PROFESSIONAL", "CASUAL", "FRIENDLY", "INTIMATE"]

export const Form = ({ className }: FormProps) => {
  const prompt = useSelector(getSelectedPrompt)
  const dispatch = useAppDispatch()
  // const { tov, lang, input } = getFormFields(prompt?.attributes.prompt)

  const newQuery = useSelector(getNewQuery)
  const isLoading = useSelector(getIsLoading)

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
            ...values,
          }),
          relatedPrompt: prompt.id,
          input: values.input,
          tov: values.tov as QueryRequest["tov"],
          lang: values.lang as QueryRequest["lang"],
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
            className='col-span-2'
            label='Контекст'
          />
          <Select
            options={langOptions}
            activeOption={formik.values.lang}
            label='Language'
            className='col-span-2'
            onChange={(value) => {
              formik.setFieldValue("lang", value)
            }}
          />
          <Select
            options={tovOptions}
            activeOption={formik.values.tov}
            label='Tone of voice'
            className='col-span-2'
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
            Clear form
          </Button>
          <Button variant='primary' size='small' type='submit' disabled={isLoading}>
            Generate
          </Button>
        </div>
      </form>
    </div>
  )
}
