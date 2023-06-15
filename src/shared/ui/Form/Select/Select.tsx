import { Listbox } from "@headlessui/react"
import clsx from "clsx"
import styles from "./Select.module.css"

interface SelectProps {
  className?: string
  label?: string
  activeOption: string
  options: string[]
  onChange: (value: string) => void
}
export const Select = ({ onChange, options, className, activeOption, label }: SelectProps) => {
  const classes = clsx(styles.wrapper, className)
  return (
    <div className={classes}>
      {label && <label className={styles.label}>{label}</label>}
      <Listbox className={styles.select} as={"div"} value={activeOption} onChange={onChange}>
        <Listbox.Button className={styles.header}>{activeOption}</Listbox.Button>
        <Listbox.Options className={styles.options}>
          {options.map((option) => (
            <Listbox.Option className={styles.option} key={option} value={option}>
              {option}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
