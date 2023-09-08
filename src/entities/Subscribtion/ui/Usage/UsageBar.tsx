import { Typography } from "@/shared/ui"
import styles from "./UsageBar.module.css"
import clsx from "clsx"
import { FC } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getUserData } from "@/entities/User"

interface Props {
  className?: string
  link?: string
}

export const UsageBar: FC<Props> = ({ className, link }) => {
  const classes = clsx(styles.wrapper, className, {
    [styles.link]: link,
  })
  const user = useSelector(getUserData)
  if (!user) return null

  const navigate = useNavigate()
  const hanldeClick = () => {
    if (!link) return
    navigate(link)
  }

  const subscription = user.subscription

  if (!subscription)
    return (
      <Link to='/' className={classes}>
        <div className={styles.text}>
          <Typography variant='small'>Оформить подписку </Typography>
          <Typography variant='h5'>Бесплатно</Typography>
          <Typography variant='small'>0 / 100 результатов</Typography>
        </div>

        <div className={styles.bar}>
          <div className={styles.progress} style={{ width: "0%" }} />
        </div>
      </Link>
    )

  const progressWidth = subscription.gptUsageLimit
    ? (user.currentUsage / subscription.gptUsageLimit) * 100
    : 0

  return (
    <div className={classes} onClick={hanldeClick}>
      <div className={styles.text}>
        <Typography variant='small'>Текущий тариф: </Typography>
        <Typography variant='h5'>{subscription.name}</Typography>
        <Typography variant='small'>
          {user.currentUsage} / {subscription.gptUsageLimit} результатов
        </Typography>
      </div>

      <div className={styles.bar}>
        <div
          className={styles.progress}
          style={{
            width: `${progressWidth}%`,
          }}
        />
      </div>
    </div>
  )
}
