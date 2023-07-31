import { getUserData, userActions } from "@/entities/User"
import { Button } from "@/shared/ui"
import { UserCircleIcon } from "@heroicons/react/24/solid"
import { FC, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import clsx from "clsx"
import styles from "./ProfileBtn.module.css"
import {
  AdjustmentsHorizontalIcon,
  ArrowLeftOnRectangleIcon,
  CreditCardIcon,
} from "@heroicons/react/20/solid"
import { useLocation, useNavigate } from "react-router-dom"
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"

interface Props {
  className?: string
}

export const ProfileBtn: FC<Props> = ({ className }) => {
  const dispatch = useAppDispatch()
  const user = useSelector(getUserData)
  const classes = clsx(styles.btn, className)
  const [menuActive, setMenuActive] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuActive(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setMenuActive(false)
  }, [pathname])

  const logout = () => {
    dispatch(userActions.logout())
  }

  return (
    <div className={classes}>
      <Button
        size='small'
        variant='ghost'
        iconRight={<UserCircleIcon />}
        className='w-full justify-center'
        onClick={() => setMenuActive(!menuActive)}
      >
        {user?.username}
      </Button>
      {menuActive && (
        <div className={styles.menu} ref={menuRef}>
          <Button
            variant='white'
            size='small'
            className={styles.menuItem}
            iconLeft={<AdjustmentsHorizontalIcon />}
            onClick={() => navigate("/profile")}
          >
            Профиль
          </Button>
          <Button
            variant='white'
            size='small'
            className={styles.menuItem}
            iconLeft={<CreditCardIcon />}
          >
            Подписка
          </Button>
          <Button
            variant='danger'
            size='small'
            className={styles.menuItem}
            iconLeft={<ArrowLeftOnRectangleIcon />}
            onClick={logout}
          >
            Выйти
          </Button>
        </div>
      )}
    </div>
  )
}
