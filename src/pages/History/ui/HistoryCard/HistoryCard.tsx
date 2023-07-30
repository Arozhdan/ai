import { Query } from "@/features/Query/model/types/Query"
import { FC, useEffect, useRef, useState } from "react"
import clsx from "clsx"
import styles from "./HistoryCard.module.css"
import { Typography } from "@/shared/ui"
import { Link } from "react-router-dom"
import { markSaved, markUnsaved } from "@/features/Query"
import { deleteQuery } from "@/features/Query/model/services/deleteQuery/deleteQuery"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"

interface Props {
  className?: string
  query: Query
}

export const HistoryCard: FC<Props> = ({ className, query }) => {
  const [showMore, setShowMore] = useState(false)
  const [menuActive, setMenuActive] = useState(false)
  const dispatch = useAppDispatch()
  const menuRef = useRef<HTMLDivElement>(null)
  const classes = clsx(styles.card, className)
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }
  const getMessage = (text: string) => {
    const toRender = showMore ? text : text.slice(0, 150) + "..."
    const replaceNewLine = toRender.replace(/\n/g, "<br />")
    return <div className={styles.body} dangerouslySetInnerHTML={{ __html: replaceNewLine }} />
  }

  const handleAction = (action: string) => {
    if (!query.id) return
    switch (action) {
      case "save":
        dispatch(markSaved({ queryId: query.id }))
        break
      case "unsave":
        dispatch(markUnsaved({ queryId: query.id }))
        break
      case "delete":
        dispatch(deleteQuery(query.id))
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuActive(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className={classes}>
      <Typography variant='h4'>{capitalizeFirstLetter(query.input)}</Typography>
      <Typography variant='h5'>
        <Link to={`/prompts/${query.prompt.slug}`}>{query.title}</Link>
      </Typography>
      <div className={styles.result}>{getMessage(query.result)}</div>
      <div className={styles.actions}>
        {query.result && query.result.length > 150 && (
          <button
            className={clsx(styles.more, {
              [styles.active]: showMore,
            })}
            onClick={() => setShowMore((prev) => !prev)}
          >
            Показать {showMore ? "меньше" : "больше"}
          </button>
        )}
      </div>
      <div className={styles.topRight}>
        {query.store ? (
          <button className={styles.menuIcon} onClick={() => handleAction("unsave")}>
            <BookmarkSlashIcon className={styles.menuItemIcon} />
          </button>
        ) : (
          <button className={styles.menuIcon} onClick={() => handleAction("save")}>
            <BookmarkIcon className={styles.menuItemIcon} />
          </button>
        )}
        <button className={styles.menuIcon} onClick={() => setMenuActive(true)}>
          <EllipsisHorizontalIcon />
        </button>
      </div>
      {menuActive && (
        <div className={styles.menu} ref={menuRef}>
          {query.store ? (
            <button className={styles.menuItem} onClick={() => handleAction("unsave")}>
              <BookmarkSlashIcon className={styles.menuItemIcon} />
              Убрать из сохраненных
            </button>
          ) : (
            <button className={styles.menuItem} onClick={() => handleAction("save")}>
              <BookmarkIcon className={styles.menuItemIcon} />
              Сохранить
            </button>
          )}
          <button className={styles.menuItem} onClick={() => handleAction("delete")}>
            <TrashIcon className={styles.menuItemIcon} /> Удалить
          </button>
        </div>
      )}
    </div>
  )
}
