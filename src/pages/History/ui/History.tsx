import { Button, Input, Loader } from "@/shared/ui"
import styles from "./History.module.css"
import { withLayout } from "@/widget/Layout"
import { useSelector } from "react-redux"
import { fetchQueries, getIsListLoading, getQueries } from "@/features/Query"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useEffect, useState } from "react"
import { HistoryCard } from "./HistoryCard/HistoryCard"
import { Query } from "@/features/Query/model/types/Query"

const History = () => {
  const dispatch = useAppDispatch()
  const [search, setSearch] = useState("")
  const [onlySaved, setOnlySaved] = useState(false)

  const [list, setList] = useState<Query[]>([])

  const isLoading = useSelector(getIsListLoading)
  const queryList = useSelector(getQueries)

  const filterListByNameOrInput = (text: string) => {
    const textLower = text.toLowerCase()
    return queryList.filter((item) => {
      const name = item.title.toLowerCase()
      const input = item.input.toLowerCase()
      return onlySaved
        ? (item.store && name.includes(textLower)) || (item.store && input.includes(textLower))
        : name.includes(textLower) || input.includes(textLower)
    })
  }

  useEffect(() => {
    if (!queryList?.length) dispatch(fetchQueries())
    setList(filterListByNameOrInput(search))
  }, [])

  useEffect(() => {
    setList(filterListByNameOrInput(search))
  }, [queryList, search, onlySaved])

  if (isLoading) return <Loader />
  return (
    <>
      <div className={styles.page}>
        <div className={styles.filterWrapper}>
          <Input
            placeholder='Найти'
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
          />
          <Button
            onClick={() => setOnlySaved((prev) => !prev)}
            className={styles.filterButton}
            variant={onlySaved ? "primary" : "secondary"}
            size='small'
          >
            {onlySaved ? "Показать все" : "Только сохраненные"}
          </Button>
        </div>
        <div className={styles.list}>
          {list?.map((item) => (
            <HistoryCard query={item} key={item.id} />
          ))}
        </div>
      </div>
    </>
  )
}

export default withLayout(History)
