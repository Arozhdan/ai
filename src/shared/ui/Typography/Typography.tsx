import clsx from "clsx"
import cls from "./Typography.module.css"

interface TypographyProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "small"
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "small"
  className?: string
  children?: React.ReactNode
}

export const Typography = ({ variant, className, as, children }: TypographyProps) => {
  const Tag = as || variant || "div"
  const classes = clsx(cls.typography, cls[variant || "p"], className)
  return <Tag className={classes}>{children}</Tag>
}
