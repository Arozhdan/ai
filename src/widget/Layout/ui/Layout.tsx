/* eslint-disable react/display-name */
import { memo, useEffect } from "react"
import styles from "./Layout.module.css"
import { Sidebar } from "./Sidebar/Sidebar"
import { Button, Typography } from "@/shared/ui"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { getSelectedPrompt } from "@/entities/Prompt"
import { getCollapsed, layoutActions } from ".."
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"
import { Bars3Icon } from "@heroicons/react/20/solid"
import { useLocation } from "react-router-dom"

const Layout = memo((props: React.PropsWithChildren) => {
  const sidebarCollapsed = useSelector(getCollapsed)
  const selectedPrompt = useSelector(getSelectedPrompt)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const path = location.pathname

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
            <Typography variant='h3' as='h1' className='text-primary line-clamp-1'>
              {selectedPrompt.attributes.name}
            </Typography>
            <Typography className='line-clamp-1'>
              {selectedPrompt.attributes.description}
            </Typography>
          </div>
        )}
        <Button size='small' variant='secondary' iconRight={<QuestionMarkCircleIcon />}>
          Help
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
