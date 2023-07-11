import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"
import { getSelectedPrompt } from "@/entities/Prompt"
import { QueryCard, getRelatedQueries } from "@/features/Query"
import { useSelector } from "react-redux"
import styles from "./QueryList.module.css"
import { Tab } from "./Tab/Tab"
import { QueryCardEmpty } from "../QueryCardEmpty/QueryCardEmpty"

export const QueryList = () => {
  const selectedPrompt = useSelector(getSelectedPrompt)
  const filteredQueries = useSelector((state: StateSchema) =>
    getRelatedQueries(state, selectedPrompt?.id),
  )
  return (
    <div className={styles.wrapper}>
      <Tab />
      <div className={styles.list}>
        {filteredQueries?.map((query) => (
          <QueryCard key={query.id} query={query} />
        ))}
        {filteredQueries?.length === 0 && <QueryCardEmpty />}
      </div>
    </div>
  )
}
