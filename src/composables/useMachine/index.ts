import axios from 'axios'
import type { Machine } from './schema'

export function useMachine() {
  async function getMachines(): Promise<Machine[] | void> {
    try {
      const response = await axios.get(`machines`)
      const { data } = response

      return data
    } catch (error) {
      console.error('Error fetching Machine data:', error)
    }
  }

  async function createMachine(machineData: Machine) {
    try {
      const response = await axios.post(`machines`, machineData)
      const { data } = response

      return data
    } catch (error) {
      console.error('Error creating Machine:', error)
    }
  }

  async function toggleProducingStatus(id: string) {
    try {
      const response = await axios.put(`machines/${id}/update-producing`)
      const { data } = response

      return data
    } catch (error) {
      console.error('Error toggling Machine status:', error)
    }
  }

  return {
    getMachines,
    createMachine,
    toggleProducingStatus,
  }
}
