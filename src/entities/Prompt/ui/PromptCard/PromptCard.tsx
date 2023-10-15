import clsx from "clsx"
import styles from "./PromptCard.module.css"
import { Typography } from "@/shared/ui"
import { Prompt } from "../.."
import { Link } from "react-router-dom"
import { PromtIcons } from "../../model/types/Prompt"
import {
  PencilIcon,
  BookOpenIcon,
  EnvelopeIcon,
  UsersIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

interface PromptCardProps {
  className?: string
  title: Prompt["attributes"]["name"]
  description: Prompt["attributes"]["description"]
  help: Prompt["attributes"]["helpText"]
  slug: Prompt["attributes"]["slug"]
  icon?: Prompt["attributes"]["icon"]
}

export const PromptCard = ({
  className,
  title,
  description,
  slug,
  icon = PromtIcons.DOCUMENT,
}: PromptCardProps) => {
  const classes = clsx(styles.PromptCard, className)
  const Icon = () => {
    switch (icon) {
      case PromtIcons.DOCUMENT:
        return <DocumentTextIcon className={styles.icon} />
      case PromtIcons.PENCIL:
        return <PencilIcon className={styles.icon} />
      case PromtIcons.BOOK:
        return <BookOpenIcon className={styles.icon} />
      case PromtIcons.ENVELOPE:
        return <EnvelopeIcon className={styles.icon} />
      case PromtIcons.USERS:
        return <UsersIcon className={styles.icon} />
      case PromtIcons.STORE:
        return <BuildingStorefrontIcon className={styles.icon} />
      default: {
        const randomIcon = Math.floor(Math.random() * 6)
        switch (randomIcon) {
          case 0:
            return <DocumentTextIcon className={styles.icon} />
          case 1:
            return <PencilIcon className={styles.icon} />
          case 2:
            return <BookOpenIcon className={styles.icon} />
          case 3:
            return <EnvelopeIcon className={styles.icon} />
          case 4:
            return <UsersIcon className={styles.icon} />
          case 5:
            return <BuildingStorefrontIcon className={styles.icon} />
        }
      }
    }
  }

  return (
    <Link to={"/prompts/" + slug} className={classes}>
      <div className={styles.iconWrapper}>
        <Icon />
      </div>
      <div className={styles.titleWrapper}>
        <Typography variant='h3' className='text-primary mb-8'>
          {title}
        </Typography>
      </div>
      <Typography>{description}</Typography>
    </Link>
  )
}
