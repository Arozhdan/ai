/* eslint-disable react/display-name */
import { memo, useState } from "react"
import { ReactComponent as Help } from "@/app/assets/icons/Help.svg"
import styles from "./Layout.module.css"
import { Sidebar } from "./Sidebar/Sidebar"
import { Button, Typography } from "@/shared/ui"
import clsx from "clsx"
import { useSelector } from "react-redux"
import { getSelectedPrompt } from "@/entities/Prompt"
import { getCollapsed, layoutActions } from ".."
import { useAppDispatch } from "@/shared/lib/useAppDispatch/useAppDispatch"
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"

const Layout = memo((props: React.PropsWithChildren) => {
  const sidebarCollapsed = useSelector(getCollapsed)
  const selectedPrompt = useSelector(getSelectedPrompt)
  const dispatch = useAppDispatch()
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
            <Typography variant='h3' as='h1' className='text-primary'>
              {selectedPrompt.attributes.name}
            </Typography>
            <Typography>{selectedPrompt.attributes.description}</Typography>
          </div>
        )}
        <Button size='small' variant='secondary' iconRight={<QuestionMarkCircleIcon />}>
          Help
        </Button>
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
