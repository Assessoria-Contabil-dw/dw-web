'use client'
import { Form } from '../Form'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { userFormShema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Loading } from '../Form/Loading'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'

type UserFormData = z.infer<typeof userFormShema>
export interface UpdateUserRef {
  id: number
  closeModal: () => void
}

export default function FormUpdate({ closeModal, id }: UpdateUserRef) {
  const [error, setError] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState('CLIENT')

  const [valuesUser, setValuesUser] = useState<UserFormData>({} as UserFormData)

  const createUserForm = useForm<UserFormData>({
    resolver: zodResolver(userFormShema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createUserForm

  async function handleUser(id: number) {
    try {
      const response = await api.get(`/users/${String(id)}`)
      console.log(response.data)
      setValuesUser(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log(id)
    handleUser(id)
  }, [id])

  async function handleUpdateUser(data: UserFormData) {
    const token = Cookie.get('token')
    try {
      const response = await api.put(
        `/users/${String(id)}`,

        {
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          role: data.role,
          disable: !!data.disable,
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
        onSubmit={handleSubmit(handleUpdateUser)}
        className="py- flex h-full w-full flex-col items-end gap-4 overflow-y-scroll border-none p-1"
      >
        <div className="h-full w-full ">
          <Form.Field>
            <Form.Label htmlFor="name">Nome</Form.Label>
            <Form.TextInput
              type="text"
              required
              defaultValue={valuesUser.name}
              name="name"
              placeholder="Nome"
            />
            {/* <Form.ErrorMessage field="name" /> */}
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="cpf">CPF</Form.Label>
            <Form.TextInput
              type="text"
              required
              defaultValue={valuesUser.cpf}
              name="cpf"
              placeholder="CPF"
            />
            {/* <Form.ErrorMessage field="cpf" /> */}
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.TextInput
              type="text"
              defaultValue={valuesUser.email}
              name="email"
              required
              placeholder="E-mail"
            />
            {/* <Form.ErrorMessage field="email" /> */}
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
