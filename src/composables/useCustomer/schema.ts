import { Machine } from '../useMachine/schema'

export type Customer = {
  id: string
  name: string
  email: string
  phone?: string
  machines?: Machine[]
}
