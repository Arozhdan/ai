import { FC, useState } from "react"
import clsx from "clsx"
import styles from "./Input.module.css"
import { ReactComponent as EyeIcon } from "@/app/assets/icons/Eye.svg"

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label?: string
  error?: string
  withLabel?: boolean
  variant?: "default" | "outlined"
  iconRight?: React.ReactNode
  onIconClick?: () => void
}

export const Input: FC<InputProps> = ({
  className,
  label,
  error,
  placeholder = label,
  withLabel = false,
  variant = "default",
  iconRight,
  onIconClick,
  type,
  ...props
}) => {
  const isPassword = type === "password"
  const [fieldType, setFieldType] = useState(type)
  return (
    <div
      className={clsx(
        styles.wrapper,
        styles[variant],
        {
          [styles.withLabel]: withLabel,
          [styles.withIcon]: iconRight || isPassword,
          [styles.hasError]: error,
        },
        className,
      )}
    >
      <div className={styles.inner}>
        <label>
          {label && <span className={styles.label}>{label}</span>}
          <input type={fieldType} placeholder={placeholder} className={styles.input} {...props} />
        </label>
        {iconRight && (
          <div className={styles.icon} onClick={onIconClick}>
            {iconRight}
          </div>
        )}
        {isPassword && (
          <div
            className={clsx(styles.icon, styles.eye)}
            onMouseDown={() => setFieldType("text")}
            onMouseUp={() => setFieldType("password")}
            onTouchStart={() => setFieldType("text")}
            onTouchEnd={() => setFieldType("password")}
          >
            <EyeIcon />
          </div>
        )}
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    </div>
  )
}
