import axios from 'axios'

export function useCustomer() {
  async function getCustomers(search: string | number = '') {
    try {
      const response = await axios.get(`customers`, {
        params: {
          search,
        },
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
