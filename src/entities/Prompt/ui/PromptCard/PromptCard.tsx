import clsx from "clsx"
import styles from "./PromptCard.module.css"
import { Typography } from "@/shared/ui"
import { Prompt } from "../.."
import { Link } from "react-router-dom"

interface PromptCardProps {
  className?: string
  title: Prompt["attributes"]["name"]
  description: Prompt["attributes"]["description"]
  help: Prompt["attributes"]["helpText"]
  slug: Prompt["attributes"]["slug"]
}

export const PromptCard = ({ className, title, description, help, slug }: PromptCardProps) => {
  const classes = clsx(styles.PromptCard, className)
  return (
    <Link to={"/prompts/" + slug} className={classes}>
      <div className={styles.title}>
        <Typography variant='h3' className='text-primary mb-8'>
          {title}
        </Typography>
      </div>
      <Typography>{description}</Typography>
    </Link>
  )
}
