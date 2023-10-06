import { FC } from "react"
import clsx from "clsx"
import styles from "./TextArea.module.css"

interface TextAreaProps extends React.HTMLProps<HTMLTextAreaElement> {
  label?: string
  error?: string
  withLabel?: boolean
}

export const TextArea: FC<TextAreaProps> = ({
  className,
  label,
  error,
  placeholder = label,
  withLabel = true,
  ...props
}) => {
  return (
    <div
      className={clsx(
        styles.wrapper,
        {
          [styles.withLabel]: withLabel,
          [styles.hasError]: error,
        },
        className,
      )}
    >
      <div className={styles.inner}>
        <label>
          {label && <span className={styles.label}>{label}</span>}
          <textarea placeholder={placeholder} className={styles.input} {...props} />
        </label>
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    </div>
  )
}
