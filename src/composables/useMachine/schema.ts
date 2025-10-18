import type { Customer } from '../useCustomer/schema'

export type Machine = {
  id: string
  name: string
  customer?: Customer
  description: string
  location: string
  producing?: boolean
}
