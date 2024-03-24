'use client'
import { Form } from '../../../../Form'
import { z } from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userFormShema } from '@/interfaces/validation'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import { useMutation, useQuery } from 'react-query'
import { AdminUserService } from '@/services/Access/Admin/user.service'
import { useNotify } from '@/components/Toast/toast'
import { queryClient } from '@/provider/query.provider'

type UserFormData = z.infer<typeof userFormShema>
export interface UpdateUserRef {
  id: string
  closeModal: () => void
}

export default function FormUpdate({ closeModal, id }: UpdateUserRef) {
  const userService = new AdminUserService();
  const notify = useNotify();

  const accessService = new AdminUserService();
  const { data, isLoading, isFetching } = useQuery<UserFormData>(
    ["accessUser", id],
    () => accessService.getById(id),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 2,
      refetchOnWindowFocus: false,
      enabled: !!id,
    }
  );

  const { mutate } = useMutation({
    mutationKey: "updateUser",
    mutationFn: () => userService.updateUser(id, {
      name: watch('name'),
      email: watch('email'),
      role: watch('role'),
      cpf: watch('cpf'),
      disabled: String(watch('disabled')),
    }),
    onSuccess: () => {
      queryClient.invalidateQueries('accessUser')
      queryClient.invalidateQueries('userData')
     return notify({ type: "success", message: "Usuário atualizado com sucesso" });
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
  });


  const createUserForm = useForm<UserFormData>({
    resolver: zodResolver(userFormShema),
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    watch,
  } = createUserForm

  async function handleUpdateUser() {
    mutate()
  }


  if(isLoading || isFetching) {
    return <div>Carregando...</div>
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
              defaultValue={data?.name}
              name="name"
              placeholder="Nome"
            />
            <Form.ErrorMessage field="name" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="cpf">CPF</Form.Label>
            <Form.TextInput
              type="text"
              required
              defaultValue={data?.cpf}
              name="cpf"
              placeholder="CPF"
            />
            <Form.ErrorMessage field="cpf" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="email">E-mail</Form.Label>
            <Form.TextInput
              type="text"
              defaultValue={data?.email}
              name="email"
              required
              placeholder="E-mail"
            />
            <Form.ErrorMessage field="email" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="disabled">Status</Form.Label>
            <Form.SelectInput
              type="text"
              placeholder="Status"
              name="disabled"
              defaultValue={String(data?.disabled)}
            >
              <option value="true">Ativo</option>
              <option value="false">Desativar</option>
            </Form.SelectInput>
            <Form.ErrorMessage field="disabled" />
          </Form.Field>

          <Form.Field>
            <Form.Label htmlFor="role">Role</Form.Label>
            <Form.SelectInput
              type="text"
              placeholder="Nível"
              name="role"
              defaultValue={data?.role}
            >
              <option value="ADMIN">Administrador</option>
              <option value="CLIENT">Cliente</option>
            </Form.SelectInput>
            <Form.ErrorMessage field="role" />
          </Form.Field>
        </div>

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
            onClick={handleUpdateUser}
            title="Atualizar"
            variant="fill"
            loading={isSubmitting}
            type="submit"
          >
            Atualizar
          </ButtonPrimary>
        </div>
      </form>
    </FormProvider>
  )
}
