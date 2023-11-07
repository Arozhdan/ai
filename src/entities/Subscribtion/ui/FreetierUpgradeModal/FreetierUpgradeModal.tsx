import { AppModal } from "@/widget/Modal"
import clsx from "clsx"
import styles from "./FreetierUpgradeModal.module.css"
import { Button, Typography } from "@/shared/ui"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { RoutePath } from "@/app/providers/router/config/routerConfig"
import { Link } from "react-router-dom"
import { FC } from "react"

interface Props {
  isOpen: boolean
  onClose: () => void
}

export const FreetierUpgradeModal: FC<Props> = ({ isOpen, onClose }) => {
  return (
    <AppModal
      className='hello'
      contentLabel='Подписка 123'
      isOpen={isOpen}
      onRequestClose={onClose}
    >
      <div className={styles.modal}>
        <div className={styles.title}>
          <Typography variant='h3' className='text-primary'>
            Подписка на Sassen AI
          </Typography>
        </div>
        <div className={styles.intro}>
          Вы превысили лимит токенов доступных в вашем пакете. Пожалуйста, обновите ваш пакет.
        </div>

        <div className={styles.action}>
          <Link to={RoutePath.subscription} className={clsx("button", styles.button)}>
            <Button variant='primary' size='small' iconRight={<ArrowRightIcon />}>
              Обновить
            </Button>
          </Link>
        </div>
      </div>
    </AppModal>
  )
}
