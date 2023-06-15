interface Output {
  tov: boolean
  lang: boolean
  input: boolean
}

export const getFormFields = (prompt?: string): Output => {
  const result: Output = {
    tov: false,
    lang: false,
    input: false,
  }
  if (!prompt) return result
  if (prompt.includes("[tov]")) result.tov = true
  if (prompt.includes("[lang]")) result.lang = true
  if (prompt.includes("[input]")) result.input = true
  return result
}
