import { format } from "date-fns"
import { enUS, ru } from "date-fns/locale"

export const useDateFormatter = (dateString: string, locale: "en" | "ru" = "ru") => {
  const date = new Date(dateString)
  const locales = {
    en: enUS,
    ru: ru,
  }
  const localeObject = locales[locale] as Locale

  return format(date, "eeee, dd MMMM", { locale: localeObject })
}
