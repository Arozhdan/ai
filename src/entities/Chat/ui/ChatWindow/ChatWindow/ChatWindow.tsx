import { useSelector } from "react-redux"
import { ChatInput } from "../ChatInput/ChatInput"
import { ChatMessage } from "../ChatMessage/ChatMessage"
import styles from "./ChatWindow.module.css"
import { getActiveChat, newMessage } from "@/entities/Chat"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useEffect, useRef } from "react"
export const ChatWindow = () => {
  const chat = useSelector(getActiveChat)
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollDown()
  }, [chat])

  const scrollDown = () => {
    if (!ref.current) return
    setTimeout(() => {
      ref.current?.scrollTo({
        top: ref.current?.scrollHeight,
      })
    }, 100)
  }

  const handleSubmit = (message: string) => {
    if (!chat) return
    dispatch(newMessage({ chatId: chat?.id, message }))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={ref}>
        <div className={styles.messages}>
          {chat?.messages?.map((message, i) => (
            <ChatMessage key={i} message={message.content} role={message.role} />
          ))}
        </div>
      </div>
      <div className={styles.input}>
        <div className={styles.inputContainer}>
          <ChatInput onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  )
}
