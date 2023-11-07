import { AppModal } from "@/widget/Modal"
import { FC } from "react"
import styles from "./SubscribeModal.module.css"
import { Button, Typography } from "@/shared/ui"
import { useSelector } from "react-redux"
import { getSubscrptionLinks } from "../.."
import { getUserData } from "@/entities/User"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { ArrowUpRightIcon } from "@heroicons/react/20/solid"
import clsx from "clsx"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const SubscribeModal: FC<Props> = ({ isOpen, onClose }) => {
  const links = useSelector(getSubscrptionLinks)
  const user = useSelector(getUserData)

  if (!user) return null

  const { email } = user

  const parseLinks = (links: string) => {
    return links
      .replace("{customerEmail}", email)
      .replace("{orderId}", new Date().getTime().toString())
      .replace(
        "{subscribtionStartDate}",
        new Date(new Date().setHours(23, 59, 59, 999)).toISOString(),
      )
  }
  return (
    <AppModal
      onRequestClose={onClose}
      className='hello'
      contentLabel='Подписка 123'
      isOpen={isOpen}
    >
      <div className={styles.links}>
        {links?.map((link) => (
          <div className={clsx(styles.link, link.isPopular && styles.popular)} key={link.label}>
            {link.isPopular && <div className={styles.badge}>Самый популярный</div>}
            <Typography variant='h2' className='text-center'>
              {link.label}
            </Typography>
            <div className={styles.intro}>{link.intro}</div>
            <div className={styles.price}>
              <Typography variant='h2'>{link.price}</Typography>
              <Typography variant='p'>в месяц</Typography>
            </div>
            <Button variant='outlined' className='mt-4 w-full' size='large'>
              <a className='uppercase' href={parseLinks(link.url)} target='_blank' rel='noreferrer'>
                Выбрать тариф <ArrowUpRightIcon className='inline-block ml-2' />
              </a>
            </Button>
            <div className={styles.featuresWrapper}>
              <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles.features}>
                {link.description}
              </ReactMarkdown>
            </div>
          </div>
        ))}
      </div>
    </AppModal>
  )
}
