import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import useAuth from './Access/User/useAuth'

export function useSetRouter(
  url?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,

) {
  const router = useRouter()
  const user = useAuth()
  const path = usePathname()

  const setRouter = (p: string) => {
    if (user?.role === 'ADMIN') {
      router.push(p)
    } else if (partyCode && !stateId && !cityCode) {
      router.push(`${p}?partido=${partyCode}`)
    } else if (partyCode && stateId && !cityCode) {
      router.push(`${p}?partido=${partyCode}&estado=${stateId}`)
    } else if (partyCode && !stateId && cityCode) {
      router.push(`${p}?partido=${partyCode}&cidade=${cityCode}`)
    }
  }

  useEffect(() => {
    if (url) setRouter(url)
    else setRouter(path)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [partyCode, stateId, cityCode])

  return setRouter
}
