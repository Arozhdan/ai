import { withLayout } from "@/widget/Layout"
import styles from "./Prompt.module.css"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useEffect } from "react"
import { fetchPromptsList, getPromptsList, promptActions } from "@/entities/Prompt"
import { useSelector } from "react-redux"
import { Form, QueryList, fetchQueries, getQueries, getIsListLoading } from "@/features/Query"
import { Loader } from "@/shared/ui"

const Prompt = () => {
  const { slug } = useParams<{ slug: string }>()
  const dispatch = useAppDispatch()
  const prompts = useSelector(getPromptsList)
  const queries = useSelector(getQueries)
  const isLoadingQueries = useSelector(getIsListLoading)

  useEffect(() => {
    if (!prompts?.length) dispatch(fetchPromptsList({}))
    if (!queries?.length) dispatch(fetchQueries())
  }, [])

  useEffect(() => {
    dispatch(promptActions.setSelectedPromptBySlug(slug))
  }, [prompts, slug])

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <Form />
      </div>
      <div className={styles.aside}>{isLoadingQueries ? <Loader /> : <QueryList />}</div>
    </div>
  )
}

export default withLayout(Prompt)
