/* eslint-disable react/display-name */
import { memo, useEffect } from "react"
import styles from "./Layout.module.css"
import { Sidebar } from "./Sidebar/Sidebar"
import { Button, Typography } from "@/shared/ui"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { addToFavorites, getSelectedPrompt, removeFromFavorites } from "@/entities/Prompt"
import { getCollapsed, layoutActions } from ".."
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { Bars3Icon, StarIcon as StarSolid, UserCircleIcon } from "@heroicons/react/20/solid"
import { StarIcon as StarOutlined } from "@heroicons/react/24/outline"
import { useLocation, useNavigate } from "react-router-dom"
import { getUserData } from "@/entities/User"

const Layout = memo((props: React.PropsWithChildren) => {
  const sidebarCollapsed = useSelector(getCollapsed)
  const selectedPrompt = useSelector(getSelectedPrompt)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const path = location.pathname

  const user = useSelector(getUserData)
  const userPrompts = user?.favPrompts || []
  const navigate = useNavigate()

  const navigateToProfile = () => navigate("/profile")

  const handleStarred = () => {
    if (!selectedPrompt) return

    const isStarred = userPrompts.some((prompt) => prompt.id === selectedPrompt.id)
    if (isStarred) {
      dispatch(
        removeFromFavorites({
          ...selectedPrompt.attributes,
          id: selectedPrompt.id,
        }),
      )
    } else {
      dispatch(
        addToFavorites({
          ...selectedPrompt.attributes,
          id: selectedPrompt.id,
        }),
      )
    }
  }

  useEffect(() => {
    const windowWidth = window.innerWidth
    if (windowWidth >= 768) return
    dispatch(layoutActions.setCollapsed(true))
  }, [path])

  return (
    <div
      className={clsx(styles.wrapper, {
        [styles.wrapperCollapsed]: sidebarCollapsed,
      })}
    >
      <header
        className={clsx(styles.header, {
          [styles.hasTitle]: Boolean(selectedPrompt),
        })}
      >
        {selectedPrompt && (
          <div>
            <div className={styles.title}>
              <Typography variant='h3' as='h1' className='text-primary line-clamp-1'>
                {selectedPrompt.attributes.name}
              </Typography>
              <button onClick={handleStarred}>
                {userPrompts.some((prompt) => prompt.id === selectedPrompt.id) ? (
                  <StarSolid className={styles.starIcon} />
                ) : (
                  <StarOutlined className={styles.starIcon} />
                )}
              </button>
            </div>
            <Typography className='line-clamp-1'>
              {selectedPrompt.attributes.description}
            </Typography>
          </div>
        )}
        <Button
          size='small'
          variant='ghost'
          iconRight={<UserCircleIcon />}
          onClick={navigateToProfile}
        >
          {user?.username}
        </Button>
        <button
          className={clsx(styles.collapseButton, {
            [styles.collapseButtonCollapsed]: sidebarCollapsed,
          })}
        >
          <Bars3Icon onClick={() => dispatch(layoutActions.setCollapsed(!sidebarCollapsed))} />
        </button>
      </header>
      <aside className={styles.sidebar}>
        <Sidebar onCollapse={(collapsed) => dispatch(layoutActions.setCollapsed(collapsed))} />
      </aside>
      <main className={styles.app}>{props.children}</main>
    </div>
  )
})

export const withLayout = <T extends Record<string, unknown>>(
  Component: React.ComponentType<T>,
) => {
  return (props: T) => {
    return (
      <Layout>
        <Component {...props} />
      </Layout>
    )
  }
}
