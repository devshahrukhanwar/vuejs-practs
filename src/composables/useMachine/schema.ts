import { Customer } from '../useCustomer/schema'

export type Machine = {
  name: string
  customer?: Customer
  description: string
  location: string
  producing?: boolean
}
