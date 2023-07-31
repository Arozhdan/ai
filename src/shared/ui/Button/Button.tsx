import styles from "./Button.module.css"
import clsx from "clsx"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  variant?: "primary" | "secondary" | "ghost" | "white" | "danger"
  iconRight?: React.ReactNode
  iconLeft?: React.ReactNode
  align?: "left" | "center" | "stretch"
  size?: "small" | "medium" | "large"
}

export const Button = ({
  className,
  children,
  iconLeft,
  iconRight,
  variant = "primary",
  align = "center",
  size = "medium",
  ...rest
}: ButtonProps) => {
  const classes = clsx(styles.Button, styles[size], styles[align], styles[variant], className, {
    [styles.withIcon]: iconLeft || iconRight,
    [styles.withIconLeft]: iconLeft,
    [styles.withIconRight]: iconRight,
  })
  return (
    <button className={classes} {...rest}>
      {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.iconRight}>{iconRight}</span>}
    </button>
  )
}
