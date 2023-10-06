import { useSelector } from "react-redux"
import { ChatInput } from "../ChatInput/ChatInput"
import { ChatMessage } from "../ChatMessage/ChatMessage"
import styles from "./ChatWindow.module.css"
import { getActiveChat, getIsTyping, newMessage } from "@/entities/Chat"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { useEffect, useRef } from "react"
import { Typography } from "@/shared/ui"
export const ChatWindow = () => {
  const chat = useSelector(getActiveChat)
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLDivElement>(null)

  const isTyping = useSelector(getIsTyping)

  useEffect(() => {
    scrollDown()
  }, [chat])

  const scrollDown = () => {
    if (!ref.current) return
    setTimeout(() => {
      ref.current?.scrollTo({
        top: ref.current?.scrollHeight,
      })
    }, 10)
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
          {isTyping && <ChatMessage isLoader message={"Печатает..."} role={"assistant"} />}
        </div>
      </div>
      <div className={styles.input}>
        <div className={styles.inputContainer}>
          {chat ? (
            <ChatInput onSubmit={handleSubmit} />
          ) : (
            <Typography variant='small' as='p' className='text-center'>
              Выберите чат
            </Typography>
          )}
        </div>
      </div>
    </div>
  )
}
