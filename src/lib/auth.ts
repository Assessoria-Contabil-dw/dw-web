import { useQuery } from 'react-query'
import { api } from './api'

export type User = {
  name: string
  role: string
} | null

export function useAuth() {
  console.log('useAuth')
  const { data, error } = useQuery<User>(
    'authUser',
    async () => {
      const response = await api.get('/auth')
      return response.data
    },
    {
      retry: false,
    },
  )

  if (error) {
    return null
  } else {
    return data
  }
}
