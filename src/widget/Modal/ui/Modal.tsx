import { FC, useEffect, useState } from "react"
import Modal from "react-modal"
import styles from "./Modal.module.css"
import clsx from "clsx"

interface Props {
  isOpen: boolean
  onAfterOpen?: () => void
  onRequestClose?: () => void
  className?: string
  overlayClassName?: string
  contentLabel: string
  children?: React.ReactNode
}

export const AppModal: FC<Props> = ({
  isOpen: modalIsOpen,
  onAfterOpen: afterOpenModal,
  onRequestClose: closeModal,
  className,
  overlayClassName,
  contentLabel,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(modalIsOpen)
  const handleClose = () => {
    setIsOpen(false)
    if (closeModal) closeModal()
  }
  useEffect(() => {
    setIsOpen(modalIsOpen)
  }, [modalIsOpen])
  return (
    <Modal
      isOpen={isOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={handleClose}
      ariaHideApp={false}
      className={clsx(styles.modal, className)}
      overlayClassName={clsx(styles.overlay, overlayClassName)}
      contentLabel={contentLabel}
      shouldCloseOnOverlayClick
    >
      {children}
    </Modal>
  )
}
