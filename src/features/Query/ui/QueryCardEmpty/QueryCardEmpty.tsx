import { Typography } from "@/shared/ui"
import styles from "./QueryCardEmpty.module.css"

export const QueryCardEmpty = () => {
  return (
    <div className={styles.wrapper}>
      <Typography variant='h3' className={styles.title}>
        You have no results in this list yet
      </Typography>
      <Typography className={styles.subtitle}>
        Try to change the tab or create a new query
      </Typography>
    </div>
  )
}
