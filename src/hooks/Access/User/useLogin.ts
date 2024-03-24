import { useNotify } from '@/components/Toast/toast'
import { UserAuthService } from '@/services/Access/User/auth.service'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'

export default function useLogin(
  cpf: string,
  password: string,
) {
  const authService = new UserAuthService()
  const notify = useNotify()
  const router = useRouter()

  const query = useMutation({
    mutationKey: 'login',
    mutationFn: () => authService.postLogin({cpf, password}),
    onSuccess: () => {
      notify({message: 'Login efetuado com sucesso', type:'success'})
      router.push('')
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
