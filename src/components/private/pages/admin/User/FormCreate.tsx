"use client";
import { Form } from "../../../../Form";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { useMutation } from "react-query";
import { AdminUserService } from "@/services/Access/Admin/user.service";
import { useNotify } from "@/components/Toast/toast";

interface FormProps {
  closeModel: () => void;
}

const userFormShema = z
  .object({
    name: z.string().min(3, 'O nome não pode ser vazio'),
    cpf: z.string().min(14, 'O CPF deve ter 11 dígitos').transform((v) => v.replace(/\D/g, '')),
    email: z.string().min(1, 'O email não pode ser vazio'),
    role: z.enum(['ADMIN', 'CLIENT']).default('CLIENT'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  })
type UserFormData = z.infer<typeof userFormShema>;

export default function FormUser({ closeModel }: FormProps) {
  const [selectedRole, setSelectedRole] = useState("CLIENT");
  const createUserForm = useForm<UserFormData>({
    resolver: zodResolver(userFormShema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = createUserForm;

  const userService = new AdminUserService();
  const notify = useNotify();

  const { mutate } = useMutation({
    mutationKey: "createUser",
    mutationFn: () =>
      userService.createUser({
        name: watch("name"),
        email: watch("email"),
        password: watch("password"),
        role: selectedRole,
        cpf: watch("cpf"),
      }),
    onSuccess: () => {
      notify({ type: "success", message: "Usuário criado com sucesso" });
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

  async function handleUser() {
   mutate()
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
            <Form.Label htmlFor="password">Senha</Form.Label>
            <Form.TextInput type="text" name="password" placeholder="Senha" />
            <Form.ErrorMessage field="password" />
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

        <div className="flex gap-4">
          <ButtonPrimary
            title="Cancelar"
            variant="outline"
            type="button"
            onClick={closeModel}
          >
            Cancelar
          </ButtonPrimary>
          <ButtonPrimary
            title="Cadastrar"
            variant="fill"
            type="submit"
            disabled={!isValid}
            loading={isSubmitting}
          >
            Cadastrar
          </ButtonPrimary>
        </div>
      </form>
    </FormProvider>
  );
}
