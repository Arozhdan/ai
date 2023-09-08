import { format } from "date-fns"
import { enUS, ru } from "date-fns/locale"

export const useDateFormatter = (
  dateString: string,
  locale: "en" | "ru" | null = "ru",
  formatString = "eeee, dd MMMM",
): string => {
  if (!dateString) return "Не определено"
  const date = new Date(dateString)
  const locales = {
    en: enUS,
    ru: ru,
  }
  const localeObject = locales[locale || "ru"]

  return format(date, formatString, { locale: localeObject })
}
