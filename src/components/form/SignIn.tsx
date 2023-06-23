'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'

const signInUserFormShema = z.object({
  cpf: z
    .string()
    .min(11, 'O CPF deve ter 11 caracteres')
    .max(11, 'O CPF deve ter 11 caracteres')
    .nonempty('O cpf é obrigatório'),
  passwordHash: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type SignInUser = z.infer<typeof signInUserFormShema>

interface TokenResponse {
  token: string
}

export function SignInForm() {
  const router = useRouter()
  const { register, handleSubmit } = useForm<SignInUser>({
    resolver: zodResolver(signInUserFormShema),
  })

  async function handleSignInUser({ cpf, passwordHash }: SignInUser) {
    try {
      const response = await api.post('/signIn', {
        cpf,
        passwordHash,
      })

      console.log(response.data)

      const { token } = response.data as TokenResponse

      cookie.set('token', token, { expires: 7, path: '/' })
      return router.refresh()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(handleSignInUser)}
      className="flex items-center justify-center"
    >
      <div className="flex w-72 flex-col items-center gap-8">
        <div className="flex w-full flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-semibold">
            CPF
            <input
              type="text"
              placeholder="Digite seu CPF"
              {...register('cpf')}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Senha
            <input
              type="password"
              placeholder="Digite sua senha"
              {...register('passwordHash')}
            />
          </label>
        </div>
        <button
          type="submit"
          className="bg-primary text-white hover:bg-primary-hover "
        >
          Entrar
        </button>
      </div>
    </form>
  )
}
