'use client'
import { Form } from '../../../../Form'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { RegisterUserRef } from './Register'
import { api } from '@/lib/api'
import { userFormShema } from '@/interfaces/validation'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'

type UserFormData = z.infer<typeof userFormShema>

export default function FormUser({ closeModal }: RegisterUserRef) {
  const [error, setError] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState('CLIENT')

  const createUserForm = useForm<UserFormData>({
    resolver: zodResolver(userFormShema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createUserForm

  async function handleUser(data: UserFormData) {
    try {
      const response = await api.post(
        '/register',

        {
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          passwordHash: data.passwordHash,
          role: data.role,
        },
      )
      console.log(response)
    } catch (err: string | any) {
      setError(err.response.data.message)
    }
  }
  return (
    <FormProvider {...createUserForm}>
      <form
        onSubmit={handleSubmit(handleUser)}
        className="flex h-full w-full flex-col items-end gap-4 overflow-y-scroll border-none p-1 py-1"
      >
        <div className="h-full w-full space-y-2">
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.TextInput type="text" name="name" placeholder="Nome" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="cpf">CPF</Form.Label>
            <Form.TextInput
              type="text"
              name="cpf"
              placeholder="CPF"
              mask="999.999.999-99"
            />
            <Form.ErrorMessage field="cpf" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.TextInput type="text" name="email" placeholder="E-mail" />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="passwordHash">Senha</Form.Label>
            <Form.TextInput
              type="text"
              name="passwordHash"
              placeholder="Senha"
            />
            <Form.ErrorMessage field="passwordHash" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="role">Role</Form.Label>
            <Form.SelectInput
              type="text"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              placeholder="Nível"
              name="role"
            >
              <option value="ADMIN">Administrador</option>
              <option value="CLIENT">Cliente</option>
            </Form.SelectInput>
            <Form.ErrorMessage field="passwordHash" />
          </Form.Field>
        </div>

        {error && <span className="text-sm text-red-500">{error}</span>}

        <div className="flex gap-4">
          <ButtonPrimary
            title="Cancelar"
            variant="outline"
            type="button"
            onClick={closeModal}
          >
            Cancelar
          </ButtonPrimary>
          <ButtonPrimary
            title="Cadastrar"
            variant="fill"
            type="submit"
            loading={isSubmitting}
          >
            Cadastrar
          </ButtonPrimary>
        </div>
      </form>
    </FormProvider>
  )
}
