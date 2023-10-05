import { useCallback } from 'react'
import toast, { ToastMessageProps } from '../Toast'

export const useNotify = () => {
  const notify = useCallback(({ type, message }: ToastMessageProps) => {
    toast({ type, message })
  }, [])

  return notify
}
