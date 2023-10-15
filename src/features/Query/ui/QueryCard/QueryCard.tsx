import clsx from "clsx"
import { Query } from "../../model/types/Query"
import styles from "./QueryCard.module.css"
import { Typography } from "@/shared/ui"
import { useEffect, useRef, useState } from "react"
import { useDateFormatter } from "@/shared/lib/useDateFormatter/useDateFormatter"
import { Link } from "react-router-dom"
import {
  BookmarkIcon,
  BookmarkSlashIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { markSaved, markUnsaved } from "../.."
import { deleteQuery } from "../../model/services/deleteQuery/deleteQuery"
interface Props {
  query: Query
  className?: string
  active?: boolean
}

export const QueryCard = ({ query, className, active }: Props) => {
  if (!query.prompt) return null

  const dispatch = useAppDispatch()
  const [menuActive, setMenuActive] = useState(false)
  const [showMore, setShowMore] = useState(false)
  const classes = clsx(styles.card, className, active && styles.cardActive, {
    [styles.cardExpanded]: showMore,
  })
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const menuRef = useRef<HTMLDivElement>(null)

  const getMessage = (text: string) => {
    const toRender = showMore ? text : text.slice(0, 150) + "..."
    const replaceNewLine = toRender.replace(/\n/g, "<br />")
    return <div className={styles.body} dangerouslySetInnerHTML={{ __html: replaceNewLine }} />
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

  return (
    <div className={classes}>
      <div className={styles.top}>
        <button className={styles.menuIcon} onClick={() => setMenuActive(true)}>
          <EllipsisHorizontalIcon />
        </button>
        <Typography variant='h4' className={styles.header}>
          {capitalizeFirstLetter(query.input)}
        </Typography>
        <Typography variant='small' className={styles.info}>
          {useDateFormatter(query.createdAt)} -{" "}
          <Link to={`/prompts/${query.prompt.slug}`} className='hover:underline'>
            {query.title}
          </Link>
        </Typography>
        <Typography as='div'>{getMessage(query.result)}</Typography>
      </div>
      <div className={styles.actions}>
        {query.result && query.result.length > 150 && (
          <button
            className={clsx(styles.more, {
              [styles.active]: showMore,
            })}
            onClick={() => setShowMore((prev) => !prev)}
          >
            {showMore ? "Скрыть" : "Показать полностью"}
          </button>
        )}
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
