import styles from "./ChatInput.module.css"
import { useState } from "react"
import { PaperAirplaneIcon } from "@heroicons/react/24/outline"
interface Props {
  onSubmit: (message: string) => void
}

export const ChatInput = ({ onSubmit }: Props) => {
  const [message, setMessage] = useState("")
  const handleClick = () => {
    onSubmit(message)
    setMessage("")
  }
  return (
    <div className={styles.root}>
      <textarea
        className={styles.input}
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        placeholder='Type a message...'
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleClick()
          }
        }}
      />
      <div className={styles.actions}>
        <button className={styles.btn} onClick={handleClick}>
          <PaperAirplaneIcon />
        </button>
      </div>
    </div>
  )
}
