'use client'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ButtonPrimary from '@/components/Buttons/ButtonPrimary'
import { useMutation, useQuery } from 'react-query'
import { AdminUserService } from '@/services/Access/Admin/user.service'
import { useNotify } from '@/components/Toast/toast'
import { Copy, X } from 'lucide-react'
import ButtonIcon from '@/components/Buttons/ButtonIcon'
import { ErrorMessage } from '@hookform/error-message'

const passwordSchema = z.object({
  password: z
    .string()
    .min(8, "Senha fraca! Mínimo 8 caracteres")

    .refine((value) => {
      return (
        value.match(/\s/) === null
      );
    }, "Retire os espaços em branco!"),
});

type passwordType = z.infer<typeof passwordSchema>;

export interface PasswordRef {
  id: string
  closeModal: () => void
}

export default function FormPassword({ closeModal, id }: PasswordRef) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<passwordType>({
    resolver: zodResolver(passwordSchema),
  });

  const notify = useNotify();
  const service = new AdminUserService();
  const { mutate, isLoading } = useMutation({
    mutationKey: "userPassword",
    mutationFn: () => service.updatePassword(id, watch("password")),
    onSuccess: () => {
      notify({ type: "success", message: "Senha alterada com sucesso" });
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

  function copyPassword() {
    const password = document.querySelector(
      'input[type="text"]'
    ) as HTMLInputElement;
    navigator.clipboard.writeText(password.value);
  }

  async function handlePasswordUser() {
    mutate();
  }

  return (
    <form
    onSubmit={handleSubmit(handlePasswordUser)}
    className="flex w-full flex-col gap-4 border-none"
  >
    <div className="flex flex-row gap-2">
      <div className="flex gap-2">
        <input
          className="input-style"
          type="text"
          placeholder="Digite uma nova senha"
          {...register("password", { required: true, min: 8 })}
        />

        <ButtonIcon
          title="Copiar senha"
          icon={<Copy size={20} />}
          type="button"
          onClick={copyPassword}
        />
      </div>
      <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <span className="text-span text-orange-500">
                {message}
              </span>
            )}
          />
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
        onClick={handlePasswordUser}
        title="Mudar senha"
        variant="fill"
        type="submit"
        disabled={!isValid}
        loading={isLoading}
      >
        Cadastrar
      </ButtonPrimary>
    </div>
  </form>
  )
}
