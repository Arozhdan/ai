interface Props {
  prompt: string
  tov?: string
  lang?: string
  input?: string
}
export const useSetPrompt = ({ prompt, tov, lang, input }: Props) => {
  return prompt
    .replace("[prompt]", prompt)
    .replace("[tov]", tov || "")
    .replace("[lang]", lang || "")
    .replace("[input]", input || "")
}
