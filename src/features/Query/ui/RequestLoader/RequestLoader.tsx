import styles from "./RequestLoader.module.css"
import { useEffect, useMemo, useState } from "react"
import { LogoExpanded, Typography } from "@/shared/ui"

export const RequestLoader = () => {
  const [messageIndex, setMessageIndex] = useState(0)
  const loadingMessages = useMemo(
    () => [
      "Loading...",
      "Be patient...",
      "Almost there...",
      "Generating response...",
      "AI is working...",
      "AI is thinking...",
    ],
    [],
  )
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <LogoExpanded />
        </div>
        <div className={styles.text}>
          <Typography variant='small'>{loadingMessages[messageIndex]}</Typography>
        </div>
      </div>
    </div>
  )
}
