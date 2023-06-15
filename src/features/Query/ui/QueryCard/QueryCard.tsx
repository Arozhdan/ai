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
  ChatBubbleBottomCenterIcon,
  EllipsisHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { markSaved, markUnsaved } from "../.."
interface Props {
  query: Query
  className?: string
  active?: boolean
}

export const QueryCard = ({ query, className, active }: Props) => {
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
        <Typography className={styles.body}>{query.result}</Typography>
      </div>
      <div className={styles.actions}>
        <button
          className={clsx(styles.more, {
            [styles.active]: showMore,
          })}
          onClick={() => setShowMore((prev) => !prev)}
        >
          Show {showMore ? "Less" : "More"}
        </button>
      </div>
      {menuActive && (
        <div className={styles.menu} ref={menuRef}>
          {query.store ? (
            <button className={styles.menuItem} onClick={() => handleAction("unsave")}>
              <BookmarkSlashIcon className={styles.menuItemIcon} />
              Unsave
            </button>
          ) : (
            <button className={styles.menuItem} onClick={() => handleAction("save")}>
              <BookmarkIcon className={styles.menuItemIcon} />
              Save
            </button>
          )}
          <button className={styles.menuItem}>
            <ChatBubbleBottomCenterIcon className={styles.menuItemIcon} /> Use template
          </button>
          <button className={styles.menuItem}>
            <TrashIcon className={styles.menuItemIcon} /> Delete
          </button>
        </div>
      )}
    </div>
  )
}
