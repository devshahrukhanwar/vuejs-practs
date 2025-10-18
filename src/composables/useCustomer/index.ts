import axios from 'axios'

export function useCustomer() {
  async function getCustomers(search: string | number = '') {
    try {
      const params: Record<string, string | number> = {}

      if (search !== '' && search !== undefined && search !== null) {
        params.search = search
      }

      const response = await axios.get(`customers`, {
        params,
      })

      const { data } = response

      return data
    } catch (error) {
      console.error('Error fetching customer data:', error)
    }
  }

  return {
    getCustomers,
  }
}
