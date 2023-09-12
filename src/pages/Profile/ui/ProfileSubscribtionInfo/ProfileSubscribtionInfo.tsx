import { UsageBar } from "@/entities/Subscribtion"
import { Typography } from "@/shared/ui"
import { FC } from "react"
import styles from "./ProfileSubscribtionInfo.module.css"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { getUserData } from "@/entities/User"
import { useSelector } from "react-redux"
import { useDateFormatter } from "@/shared/lib/useDateFormatter/useDateFormatter"

interface Props {
  className?: string
}

export const ProfileSubscribtionInfo: FC<Props> = ({ className }) => {
  const user = useSelector(getUserData)
  const subscription = user?.subscription

  if (!subscription) return null

  return (
    <div className={clsx(className, styles.wrapper)}>
      <Typography variant='h3' className='text-primary'>
        Подписка
      </Typography>
      <UsageBar />
      <div className={styles.info}>
        <Typography variant='h4' className='text-primary mb-2'>
          Информация о подписке
        </Typography>
        <Typography variant='small'>
          Дата подписки:{" "}
          <span className='text-primary'>
            {useDateFormatter(subscription.createdAt, null, "dd.MM.yyyy")}
          </span>
        </Typography>
        <Typography as='div' variant='small'>
          Текущий тариф: <span className='text-primary'>{subscription.name}</span>
        </Typography>
        <Typography as='div' variant='small'>
          Следующее обновление:{" "}
          <span className='text-primary'>
            {useDateFormatter(subscription.dateNextPayment, null, "dd.MM.yyyy")}
          </span>
        </Typography>
        <Typography
          as='div'
          variant='small'
          className='text-primary mt-2'
          style={{ cursor: "pointer" }}
        >
          <Link to='/subscription'>Подробнее</Link>
        </Typography>
      </div>
    </div>
  )
}
