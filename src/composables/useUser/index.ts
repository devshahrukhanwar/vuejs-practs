import axios from 'axios'

export function useUser() {
  async function getUsers() {
    try {
      const response = await axios.get(`http://localhost:3030/users`)
      const { data } = response.data

      return data
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  return {
    getUsers,
  }
}
