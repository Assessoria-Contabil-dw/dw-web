import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAuth } from './useAuth'

export function useSetRouter(
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
) {
  const router = useRouter()
  const user = useAuth()
  const path = usePathname()

  console.log(partyCode, stateId, cityCode, path, user?.role)
  useEffect(() => {
    if (user?.role === 'ADMIN') {
      router.push(path)
    } else if (partyCode && !stateId && !cityCode) {
      router.push(`${path}?partido=${partyCode}`)
    } else if (partyCode && stateId && !cityCode) {
      router.push(`${path}?partido=${partyCode}&estado=${stateId}`)
    } else if (partyCode && !stateId && cityCode) {
      router.push(`${path}?partido=${partyCode}&cidade=${cityCode}`)
    }
  }, [user, partyCode, stateId, cityCode, path, router])
}
