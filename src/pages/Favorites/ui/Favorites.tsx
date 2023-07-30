import { withLayout } from "@/widget/Layout"
import styles from "./Favorites.module.css"
import { Input, Loader } from "@/shared/ui"
import { useSelector } from "react-redux"
import { getUserData } from "@/entities/User"
import { PromptCard, promptActions } from "@/entities/Prompt"
import { getIsUserLoading } from "@/entities/User/model/selectors/getIsUserLoading"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useEffect } from "react"

const Favorites = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(getUserData)
  const prompts = user?.favPrompts
  const isLoading = useSelector(getIsUserLoading)

  useEffect(() => {
    dispatch(promptActions.unsetSelectedPrompt())
  }, [])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Input label='Найти...' />
      </div>
      <div className={styles.wrapper}>
        {isLoading && <Loader />}
        {prompts?.map((prompt) => (
          <PromptCard
            key={prompt.id}
            title={prompt.name}
            description={prompt.description}
            help={prompt.helpText}
            slug={prompt.slug}
          />
        ))}
      </div>
    </div>
  )
}

export default withLayout(Favorites)
