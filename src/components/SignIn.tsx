'use client'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { api } from '@/lib/api'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import { Loading } from './Form/Loading'
import { Form } from './Form'

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
  const createLogin = useForm<SignInUser>({
    resolver: zodResolver(signInUserFormShema),
  })

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = createLogin

  async function handleSignInUser({ cpf, passwordHash }: SignInUser) {
    try {
      const response = await api.post('/signIn', {
        cpf,
        passwordHash,
      })

      const { token } = response.data as TokenResponse

      cookie.set('token', token, { expires: 7, path: '/' })
      return router.refresh()
    } catch (err) {
      console.log('Erro ao fazer login')
      console.log(err)
    }
  }

  return (
    <FormProvider {...createLogin}>
      <form
        onSubmit={handleSubmit(handleSignInUser)}
        className="flex items-center justify-center"
      >
        <div className="flex w-72 flex-col items-center gap-8">
          <div className="flex w-full flex-col gap-4">
            <Form.Field>
              <Form.Label>CPF</Form.Label>
              <Form.TextInput
                type="text"
                placeholder="Digite seu CPF"
                name="cpf"
              />
              <Form.ErrorMessage field="cpf" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Senha</Form.Label>
              <Form.TextInput
                type="password"
                placeholder="Digite sua senha"
                name="passwordHash"
              />
              <Form.ErrorMessage field="passwordHash" />
            </Form.Field>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white hover:bg-green-600 disabled:bg-primary disabled:text-white"
          >
            {isSubmitting ? <Loading /> : 'Entrar'}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
