import { withLayout } from "@/widget/Layout"
import styles from "./Subscribtion.module.css"
import { Button, Typography } from "@/shared/ui"
import { UsageBar, getSubscrptionStatusLabel } from "@/entities/Subscribtion"
import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { getUserData } from "@/entities/User"
import { useSelector } from "react-redux"
import { useDateFormatter } from "@/shared/lib/useDateFormatter/useDateFormatter"

const Subscribtion = () => {
  const user = useSelector(getUserData)
  const subscription = user?.subscription

  if (!subscription) return null

  return (
    <div className={styles.page}>
      <div className={styles.info}>
        <Typography variant='h2' className='text-primary'>
          Управление подпиской
        </Typography>
        <UsageBar />
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <Typography variant='h5'>
              Дата подписки:
              <Typography variant='small' className='pl-2'>
                {useDateFormatter(subscription.createdAt, null, "dd.MM.yyyy")}
              </Typography>
            </Typography>
            <Typography variant='h5'>
              Дата окончания:
              <Typography variant='small' className='pl-2'>
                {useDateFormatter(subscription.dateLastPayment, null, "dd.MM.yyyy")}
              </Typography>
            </Typography>
            <Typography variant='h5'>
              Стоимость:
              <Typography variant='small' className='pl-2'>
                {subscription.cost}
              </Typography>
            </Typography>

            <Typography variant='h5'>
              Статус:
              <Typography variant='small' className='pl-2'>
                {getSubscrptionStatusLabel(subscription.status)}
              </Typography>
            </Typography>

            <Typography variant='h5'>
              Тариф:
              <Typography variant='small' className='pl-2'>
                {subscription.name}
              </Typography>
            </Typography>

            <Typography variant='h5'>
              Следующее списание:
              <Typography variant='small' className='pl-2'>
                {useDateFormatter(subscription.dateNextPayment, null, "dd.MM.yyyy")}
              </Typography>
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <Typography variant='h3' className='text-primary pl-5'>
          Дополнительные действия
        </Typography>
        <div className={styles.actionsList}>
          <Button variant='ghost' size='small' iconRight={<ArrowUpRightIcon />}>
            Условия подписки
          </Button>
          <Button variant='ghost' size='small' iconRight={<ArrowUpRightIcon />}>
            Сменить тариф
          </Button>
          <Button variant='ghost' size='small' iconRight={<ArrowUpRightIcon />}>
            Связаться с поддержкой
          </Button>
          <Button variant='danger' size='small' iconRight={<ArrowUpRightIcon />}>
            Отменить подписку
          </Button>
        </div>
      </div>
    </div>
  )
}

export default withLayout(Subscribtion)
