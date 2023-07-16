import { Typography } from "@/shared/ui"
import styles from "./QueryCardEmpty.module.css"

export const QueryCardEmpty = () => {
  return (
    <div className={styles.wrapper}>
      <Typography variant='h3' className={styles.title}>
        К сожалению, ничего не найдено
      </Typography>
      <Typography className={styles.subtitle}>
        Попробуйте изменить параметры поиска или сгенерируйте новый запрос
      </Typography>
    </div>
  )
}
