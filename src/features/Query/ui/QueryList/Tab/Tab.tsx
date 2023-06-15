import clsx from "clsx"
import styles from "./Tab.module.css"
import {
  ChatBubbleOvalLeftEllipsisIcon,
  BookmarkSquareIcon,
  ClockIcon,
} from "@heroicons/react/20/solid"
import { useSelector } from "react-redux"
import { getActiveTab } from "@/features/Query"
import { QueryTab } from "@/features/Query/model/types/QuerySchema"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { queryActions } from "@/features/Query/model/slice/QuerySlice"

interface Props {
  className?: string
}

export const Tab = ({ className }: Props) => {
  const dispatch = useAppDispatch()
  const activeTab = useSelector(getActiveTab)

  const handleClick = (tab: QueryTab) => {
    dispatch(queryActions.setTab(tab))
  }

  return (
    <div className={clsx(styles.tabs, className)}>
      <button
        className={clsx(styles.tab, {
          [styles.active]: activeTab === QueryTab.RELATED,
        })}
        onClick={() => handleClick(QueryTab.RELATED)}
      >
        <ChatBubbleOvalLeftEllipsisIcon /> Соответствие
      </button>
      <button
        className={clsx(styles.tab, {
          [styles.active]: activeTab === QueryTab.HISTORY,
        })}
        onClick={() => handleClick(QueryTab.HISTORY)}
      >
        <ClockIcon />
        История
      </button>
      <button
        className={clsx(styles.tab, {
          [styles.active]: activeTab === QueryTab.SAVED,
        })}
        onClick={() => handleClick(QueryTab.SAVED)}
      >
        <BookmarkSquareIcon />
        Сохраненное
      </button>
    </div>
  )
}
