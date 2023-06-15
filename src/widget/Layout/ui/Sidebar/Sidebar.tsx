import clsx from "clsx"
import styles from "./Sidebar.module.css"
import { FC, useState } from "react"
import { LogoExpanded } from "@/shared/ui/Logo/LogoExpanded"
import { SidebarItem } from "../SidebarItem/SidebarItem"
import { ReactComponent as HomeIcon } from "@/app/assets/icons/Home_Empty.svg"
import { ReactComponent as CategoryIcon } from "@/app/assets/icons/Category.svg"
import { ReactComponent as UsersIcon } from "@/app/assets/icons/Users.svg"
import { ReactComponent as FileIcon } from "@/app/assets/icons/File.svg"
import { ReactComponent as ProIcon } from "@/app/assets/icons/Pro.svg"
import { ReactComponent as ChatIcon } from "@/app/assets/icons/Chat.svg"
import { ReactComponent as CollectionIcon } from "@/app/assets/icons/Collection.svg"
import { ReactComponent as Arrow } from "@/app/assets/icons/ArrowRight.svg"
import { useLocation } from "react-router-dom"
import { Logo } from "@/shared/ui"
import { useSelector } from "react-redux"
import { getCollapsed, layoutActions } from "../.."
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"

interface SidebarProps {
  onCollapse: (isCollapsed: boolean) => void
}

export const Sidebar: FC<SidebarProps> = ({ onCollapse }) => {
  const location = useLocation()
  const path = location.pathname
  const collapsed = useSelector(getCollapsed)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    onCollapse(!collapsed)
    dispatch(layoutActions.setCollapsed(!collapsed))
  }

  return (
    <div
      className={clsx(styles.sidebar, {
        [styles.sidebarCollapsed]: collapsed,
      })}
    >
      <div className={styles.sidebarHeader} onClick={handleClick}>
        {collapsed ? <Logo /> : <LogoExpanded />}
      </div>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarContentTop}>
          <SidebarItem collapsed={collapsed} active={path === "/"} to={"/"} icon={<HomeIcon />}>
            Дашборд
          </SidebarItem>
          <SidebarItem collapsed={collapsed} to={"/"} icon={<CategoryIcon />}>
            Шаблоны
          </SidebarItem>
          <SidebarItem collapsed={collapsed} to={"/"} icon={<UsersIcon />}>
            Комьюнити
          </SidebarItem>
          <SidebarItem collapsed={collapsed} to={"/"} icon={<CategoryIcon />}>
            Шаблоны
          </SidebarItem>
        </div>
        <div className={styles.sidebarContentMiddle}>
          <SidebarItem collapsed={collapsed} accent to={"/"} icon={<FileIcon />}>
            Документ&nbsp;&nbsp;+
          </SidebarItem>
          <SidebarItem collapsed={collapsed} accent to={"/"} icon={<ProIcon />}>
            Pro&nbsp;&nbsp;+
          </SidebarItem>
        </div>
        <div className={styles.sidebarContentBottom}>
          <SidebarItem collapsed={collapsed} accent to={"/"} icon={<ChatIcon />}>
            Документ&nbsp;&nbsp;+
          </SidebarItem>
          <SidebarItem collapsed={collapsed} accent to={"/"} icon={<CollectionIcon />}>
            Документ&nbsp;&nbsp;+
          </SidebarItem>
          <button onClick={handleClick} className={styles.sidebarCollapseToggle}>
            <Arrow />
          </button>
        </div>
      </div>
    </div>
  )
}
