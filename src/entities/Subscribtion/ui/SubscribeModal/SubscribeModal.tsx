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
      <Typography variant='h2' className='text-primary'>
        Оформите подписку
      </Typography>
      <Typography variant='small' className='block mt-8'>
        Оформите подписку и получите доступ к полному функционалу сервиса. Подписка дает доступ к
        полному функционалу сервиса.
      </Typography>
      <div className={styles.links}>
        {links?.map((link) => (
          <div className={styles.link} key={link.url}>
            <Typography variant='h5'>{link.label}</Typography>
            <div className='prose prose-sm mt-2 mb-4'>{link.intro}</div>
            <ReactMarkdown className='prose prose-sm' remarkPlugins={[remarkGfm]}>
              {link.description}
            </ReactMarkdown>
            <div className={styles.linkFooter}>
              <Button variant='primary' className='mt-4 w-full' size='small'>
                <a href={parseLinks(link.url)} target='_blank' rel='noreferrer'>
                  Оформить <ArrowUpRightIcon className='inline-block ml-2' />
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </AppModal>
  )
}
