import clsx from "clsx"
import styles from "./Sidebar.module.css"
import { FC } from "react"
import { LogoExpanded } from "@/shared/ui/Logo/LogoExpanded"
import { SidebarItem } from "../SidebarItem/SidebarItem"
import { Link, useLocation } from "react-router-dom"
import { Logo } from "@/shared/ui"
import { useSelector } from "react-redux"
import { getCollapsed, layoutActions } from "../.."
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import {
  HeartIcon,
  HomeIcon,
  QueueListIcon,
  SparklesIcon,
  ArrowRightIcon,
  UserCircleIcon,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline"
import { getUserData } from "@/entities/User"

interface SidebarProps {
  onCollapse: (isCollapsed: boolean) => void
}

export const Sidebar: FC<SidebarProps> = ({ onCollapse }) => {
  const location = useLocation()
  const path = location.pathname
  const collapsed = useSelector(getCollapsed)
  const dispatch = useAppDispatch()
  const user = useSelector(getUserData)

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
      <Link to='/' className={styles.sidebarHeader}>
        {collapsed ? <Logo /> : <LogoExpanded />}
      </Link>
      <div className={styles.sidebarContent}>
        <div className={styles.sidebarContentTop}>
          <SidebarItem collapsed={collapsed} active={path === "/"} to={"/"} icon={<HomeIcon />}>
            Дашборд
          </SidebarItem>
          <SidebarItem
            collapsed={collapsed}
            active={path === "/favorites"}
            to={"/favorites"}
            icon={<HeartIcon />}
          >
            Избранное
          </SidebarItem>
          <SidebarItem
            collapsed={collapsed}
            active={path === "/history"}
            to={"/history"}
            icon={<QueueListIcon />}
          >
            История
          </SidebarItem>
          <SidebarItem collapsed={collapsed} to={"/chat"} icon={<ChatBubbleBottomCenterTextIcon />}>
            ChatPRO
          </SidebarItem>
        </div>
        <div className={styles.sidebarContentMiddle}>
          <SidebarItem collapsed={collapsed} accent to={"/"} icon={<SparklesIcon />}>
            Pro&nbsp;&nbsp;+
          </SidebarItem>
        </div>
        <div className={styles.sidebarContentBottom}>
          <SidebarItem collapsed={collapsed} accent to={"/profile"} icon={<UserCircleIcon />}>
            {user?.username}
          </SidebarItem>
          <button onClick={handleClick} className={styles.sidebarCollapseToggle}>
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </div>
  )
}
