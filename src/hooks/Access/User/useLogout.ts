import { useNotify } from '@/components/Toast/toast'
import { UserAuthService } from '@/services/Access/User/auth.service'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'

export default function useLogout() {
  const authService = new UserAuthService()
  const notify = useNotify()
  const router = useRouter()

  const query = useMutation({
    mutationKey: 'logout',
    mutationFn: () => authService.postLogout(),
    onSuccess: () => {
      notify({message: 'Você saiu da sua conta', type:'success'})
      router.push('/login')
    },
    onError: (error: any) => {
      if (error.response.data.status === 500) {
        console.error(error);
        return notify({
          type: "error",
          message: "Erro interno, tente novamente mais tarde",
        });
      }
  
      return notify({
        type: "error",
        message: error.response.data.message,
      });
    },
  })

  return query
}

