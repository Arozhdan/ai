import { Listbox } from "@headlessui/react"
import clsx from "clsx"
import styles from "./Select.module.css"

interface SelectProps {
  className?: string
  label?: string
  activeOption: { label: string; value: string }
  options: { label: string; value: string }[]
  onChange: ({ label, value }: { label: string; value: string }) => void
}
export const Select = ({ onChange, options, className, activeOption, label }: SelectProps) => {
  const handleChange = (e: string) => {
    const option = options.find((option) => option.value === e)
    if (!option) return
    onChange(option)
  }

  const classes = clsx(styles.wrapper, className)
  return (
    <div className={classes}>
      {label && <label className={styles.label}>{label}</label>}
      <Listbox
        className={styles.select}
        as={"div"}
        value={activeOption}
        onChange={(e) => handleChange(e as unknown as string)}
      >
        <Listbox.Button className={styles.header}>{activeOption.label}</Listbox.Button>
        <Listbox.Options className={styles.options}>
          {options.map((option) => (
            <Listbox.Option
              className={styles.option}
              key={typeof option === "string" ? option : option.value}
              value={typeof option === "string" ? option : option.value}
            >
              {typeof option === "string" ? option : option?.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}
