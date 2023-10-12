'use client'
import { Form } from '../../Form'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { userFormShema } from '@/@types/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Loading } from '../../Form/Loading'
import { RegisterUserRef } from './Register'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'

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
    const token = Cookie.get('token')
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

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        className="py- flex h-full w-full flex-col items-end gap-4 overflow-y-scroll border-none p-1"
      >
        <div className="h-full w-full ">
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.TextInput type="text" name="name" placeholder="Nome" />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="cpf">CPF</Form.Label>
            <Form.TextInput type="text" name="cpf" placeholder="CPF" mask='999.999.999-99' />
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
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-primary text-white hover:bg-green-600 disabled:bg-primary disabled:text-white"
          >
            {isSubmitting ? <Loading /> : 'Cadastrar'}
          </button>
        </div>
      </form>
    </FormProvider>
  )
}
