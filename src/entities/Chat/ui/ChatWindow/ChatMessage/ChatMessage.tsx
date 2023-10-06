import clsx from "clsx"
import { FC } from "react"
import styles from "./ChatMessage.module.css"
import { CpuChipIcon, UserIcon } from "@heroicons/react/24/outline"

interface Props {
  className?: string
  message: string
  role: "user" | "assistant"
  isLoader?: boolean
}

export const ChatMessage: FC<Props> = ({ className, message, role, isLoader }) => {
  const icon = role === "user" ? <UserIcon /> : <CpuChipIcon />
  const classes = clsx(styles.root, className, {
    [styles.user]: role === "user",
    [styles.assistant]: role === "assistant",
    [styles.loader]: isLoader,
  })

  const renderMessage = message?.split("\n").map((line, i) => (
    <div key={i} className={styles.line}>
      {line}
    </div>
  ))

  return (
    <div className={classes}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.message}>{renderMessage}</div>
    </div>
  )
}
