import { useQuery } from 'react-query'
import { api } from './api'

export type User = {
  sub: string
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
      staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  )

  if (error) {
    return null
  } else {
    return data
  }
}
