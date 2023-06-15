import clsx from "clsx"
import cls from "./SidebarItem.module.css"
import { Link, LinkProps } from "react-router-dom"
import { memo } from "react"

interface SidebarItemProps extends LinkProps {
  active?: boolean
  className?: string
  icon?: React.ReactNode
  accent?: boolean
  collapsed?: boolean
}

export const SidebarItem = memo(
  ({
    className,
    accent = false,
    active = false,
    collapsed = false,
    icon,
    children,
    ...rest
  }: SidebarItemProps) => {
    const classes = clsx(cls.SidebarItem, className, {
      [cls.SidebarItemActive]: active,
      [cls.SidebarItemAccent]: accent,
      [cls.SidebarItemCollapsed]: collapsed,
    })
    return (
      <Link {...rest} className={classes}>
        {icon && <span className={cls.SidebarItemIcon}>{icon}</span>}
        {!collapsed && <span className={cls.SidebarItemText}>{children}</span>}
      </Link>
    )
  },
)
