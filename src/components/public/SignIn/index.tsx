"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../Form";
import imgLogo from "../../../assets/cdw.svg";
import Image from "next/image";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import useLogin from "@/hooks/Access/User/useLogin";

const signInUserFormShema = z
  .object({
    cpf: z.string().refine(
      (value) => {
        const cleanedValue = value.replace(/[.-]/g, "");
        return cleanedValue.length === 11 && /^\d{11}$/.test(cleanedValue);
      },
      { message: "CPF inválido" }
    ),
    password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  })
  .transform((field) => ({
    cpf: field.cpf.replace(/[^0-9]/g, ""),
    password: field.password,
  }));

type SignInUser = z.infer<typeof signInUserFormShema>;

export function SignInForm() {
  const createLogin = useForm<SignInUser>({
    resolver: zodResolver(signInUserFormShema),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = createLogin;

  const { mutate } = useLogin(watch("cpf"), watch("password"));

  async function handleSignInUser() {
    await mutate();
  }

  return (
    <FormProvider {...createLogin}>
      <form
        onSubmit={handleSubmit(handleSignInUser)}
        className="flex flex-col items-center justify-center gap-6"
      >
        <div className="flex flex-col items-center gap-2">
          <Image
            src={imgLogo}
            alt="Logo"
            className="h-auto w-[100px]"
            width={100}
            height={100}
            priority={false}
          />
          <h4 className="text-h4">Entre na sua conta</h4>
        </div>
        <div className="flex w-72 flex-col items-center gap-6">
          <div className="flex w-full flex-col gap-4">
            <Form.Field>
              <Form.Label>CPF</Form.Label>
              <Form.TextInput
                mask="999.999.999-99"
                placeholder="000.000.000-00"
                name="cpf"
                type="text"
              />
              <Form.ErrorMessage field="cpf" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Senha</Form.Label>
              <Form.PasswordInput
                placeholder="Digite sua senha"
                name="password"
              />
              <Form.ErrorMessage field="password" />
            </Form.Field>
          </div>

          <div className="flex w-full flex-col gap-3 text-center">
            <ButtonPrimary
              title="Entrar"
              variant="fill"
              type="submit"
              loading={isSubmitting}
              className=" w-full justify-center"
            >
              Entrar
            </ButtonPrimary>
            <p className="font-sans text-xs font-normal text-slate-500">
              Ainda não tem uma conta?{" "}
              <a
                className="cursor-pointer text-second underline 
                focus-visible:rounded-sm focus-visible:ring-1 focus-visible:ring-slate-800  focus-visible:ring-offset-2"
                target="blank"
                href="https://api.whatsapp.com/send?phone=559991014072"
              >
                Clique aqui!
              </a>
            </p>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
