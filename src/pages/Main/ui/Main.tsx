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
import { getUserAuthData } from "@/entities/User"

const Main = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(getUserAuthData)

  const isLoading = useSelector(getPromptsListIsLoading)
  const query = useSelector(getPromptQuery)
  const filteredPrompts = useSelector((state: StateSchema) =>
    getFilteredPrompts(state, { query: query }),
  )

  useEffect(() => {
    if (!user.jwt) return
    if (!filteredPrompts?.length) dispatch(fetchPromptsList({}))
    dispatch(promptActions.unsetSelectedPrompt())
  }, [user.jwt])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(promptActions.setPromptsListQuery(e.target.value))
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Input value={query || ""} onChange={handleChange} label='Найти...' />
      </div>
      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {filteredPrompts?.map((prompt) => (
          <PromptCard
            key={prompt.id}
            title={prompt.attributes.name}
            description={prompt.attributes.description}
            help={prompt.attributes.helpText}
            slug={prompt.attributes.slug}
            icon={prompt.attributes.icon}
          />
        ))}
      </div>
    </div>
  )
}

export default withLayout(Main)
