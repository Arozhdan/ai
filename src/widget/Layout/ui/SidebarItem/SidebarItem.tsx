import clsx from "clsx"
import cls from "./SidebarItem.module.css"
import { Link, LinkProps, useNavigate } from "react-router-dom"
import { memo, useState } from "react"
import { Typography } from "@/shared/ui"
import { ChatAccessModal } from "@/entities/Subscribtion"

interface SidebarItemProps extends LinkProps {
  active?: boolean
  className?: string
  icon?: React.ReactNode
  accent?: boolean
  upgrageRequired?: boolean
  collapsed?: boolean
}

export const SidebarItem = memo(
  ({
    className,
    accent = false,
    active = false,
    upgrageRequired = false,
    collapsed = false,
    icon,
    children,
    ...rest
  }: SidebarItemProps) => {
    const classes = clsx(cls.SidebarItem, className, {
      [cls.SidebarItemActive]: active,
      [cls.SidebarItemAccent]: accent,
      [cls.SidebarItemCollapsed]: collapsed,
      [cls.SidebarItemUpgradeRequired]: upgrageRequired,
    })

    const [isModalOpen, setModalOpen] = useState(false)

    const handleClick = (e: any) => {
      if (!upgrageRequired) return
      e.preventDefault()
      setModalOpen(true)
    }
    return upgrageRequired ? (
      <>
        {upgrageRequired && (
          <ChatAccessModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        )}
        <div className={classes} onClick={handleClick}>
          {icon && <span className={cls.SidebarItemIcon}>{icon}</span>}
          {!collapsed && (
            <Typography variant='span' className={cls.SidebarItemText}>
              {children}
            </Typography>
          )}
        </div>
      </>
    ) : (
      <>
        <Link {...rest} className={classes}>
          {icon && <span className={cls.SidebarItemIcon}>{icon}</span>}
          {!collapsed && (
            <Typography variant='span' className={cls.SidebarItemText}>
              {children}
            </Typography>
          )}
        </Link>
      </>
    )
  },
)
