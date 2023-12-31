import { withLayout } from "@/widget/Layout"
import styles from "./Subscribtion.module.css"
import { Button, Typography } from "@/shared/ui"
import {
  SubscribeModal,
  UsageBar,
  fetchSubscriptionLinks,
  getSubscrptionStatusLabel,
} from "@/entities/Subscribtion"
import { ArrowUpRightIcon } from "@heroicons/react/24/solid"
import { getUserData } from "@/entities/User"
import { useSelector } from "react-redux"
import { useDateFormatter } from "@/shared/lib/useDateFormatter/useDateFormatter"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useEffect, useState } from "react"

const Subscribtion = () => {
  const user = useSelector(getUserData)
  const subscription = user?.subscription
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!subscription) return null

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (subscription.cost <= 0) dispatch(fetchSubscriptionLinks())
  }, [])

  return (
    <>
      <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
                  {useDateFormatter(subscription.dateFirstPayment, null, "dd.MM.yyyy")}
                </Typography>
              </Typography>
              <Typography variant='h5'>
                Последнее списание:
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
              {subscription.active === "1" && (
                <Button
                  className='mt-10'
                  variant='primary'
                  size='small'
                  iconRight={<ArrowUpRightIcon />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Оформить подписку
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          {subscription.status !== "active" ? (
            <>
              <Typography variant='h3' className='text-primary pl-5'>
                Дополнительные действия
              </Typography>
              <div className={styles.actionsList}>
                <Button variant='ghost' size='small' iconRight={<ArrowUpRightIcon />}>
                  Условия подписки
                </Button>
                <Button variant='ghost' size='small' iconRight={<ArrowUpRightIcon />}>
                  Связаться с поддержкой
                </Button>
                <Button
                  variant='secondary'
                  size='small'
                  iconRight={<ArrowUpRightIcon />}
                  onClick={() => setIsModalOpen(true)}
                >
                  Оформить подписку
                </Button>
              </div>
            </>
          ) : (
            <>
              <Typography variant='h3' className='text-primary pl-5'>
                Дополнительные действия
              </Typography>
              <div className={styles.actionsList}>
                <Button
                  variant='ghost'
                  size='small'
                  iconRight={<ArrowUpRightIcon />}
                  onClick={() => {
                    window.open(
                      "https://admin.sassendigital.com/uploads/Oferta_servis_liczenziya_tarify_chat_bot_98121010be.pdf",
                      "_blank",
                    )
                  }}
                >
                  Условия подписки
                </Button>
                <Button
                  variant='ghost'
                  size='small'
                  onClick={() => {
                    window.location.href = "mailto:aisupport@sassendigital.com"
                  }}
                  iconRight={<ArrowUpRightIcon />}
                >
                  <a href='mailto:aisupport@sassendigital'>Связаться с поддержкой</a>
                </Button>
                <Button variant='danger' size='small' iconRight={<ArrowUpRightIcon />}>
                  <a href='mailto:aisupport@sassendigital'>Отменить подписку</a>
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default withLayout(Subscribtion)
