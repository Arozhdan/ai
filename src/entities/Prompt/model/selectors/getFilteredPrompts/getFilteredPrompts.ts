import { StateSchema } from "@/app/providers/StoreProvider/config/StateSchema"

export const getFilteredPrompts = (state: StateSchema, props: { query?: string | null }) => {
  const query = props.query?.trim().toLocaleLowerCase()
  if (!query) return state.prompt.promptsList
  return state.prompt.promptsList?.filter((prompt) =>
    prompt.attributes.name.toLowerCase().includes(query),
  )
}
