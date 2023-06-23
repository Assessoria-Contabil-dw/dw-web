import decode from 'jwt-decode'
import { cookies } from 'next/headers'

interface User {
  name: string
  email: string
  role: string
  sub: string
}

export function getUser(): User {
  const token = cookies().get('token')?.value

  if (!token) {
    throw new Error('Unauthenticated.')
  }

  const user: User = decode(token)

  return user
}
