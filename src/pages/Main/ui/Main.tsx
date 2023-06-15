import {
  PromptCard,
  fetchPromptsList,
  getFilteredPrompts,
  getPromptQuery,
  getPromptsListIsLoading,
  promptActions,
} from "@/entities/Prompt"
import { withLayout } from "@/widget/Layout"
import styles from "./Main.module.css"
import { useEffect } from "react"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useSelector } from "react-redux"
import { Input, Loader } from "@/shared/ui"
import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

const Main = () => {
  const dispatch = useAppDispatch()
  const isLoading = useSelector(getPromptsListIsLoading)
  const query = useSelector(getPromptQuery)
  const filteredPrompts = useSelector((state: StateSchema) =>
    getFilteredPrompts(state, { query: query }),
  )
  // useEffect(() => {
  //   dispatch(promptActions.unsetSelectedPrompt())
  // })
  useEffect(() => {
    if (!filteredPrompts?.length) dispatch(fetchPromptsList({}))
    dispatch(promptActions.unsetSelectedPrompt())
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(promptActions.setPromptsListQuery(e.target.value))
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>
        <Input value={query || ""} onChange={handleChange} label='Фильровать...' />
      </h1>
      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {filteredPrompts?.map((prompt) => (
          <PromptCard
            key={prompt.id}
            title={prompt.attributes.name}
            description={prompt.attributes.description}
            help={prompt.attributes.helpText}
            slug={prompt.attributes.slug}
          />
        ))}
      </div>
    </div>
  )
}

export default withLayout(Main)
