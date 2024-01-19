"use client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "../../Form";
import imgLogo from "../../../assets/cdw.svg";
import Image from "next/image";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNotify } from "../../Toast/toast";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";

const signInUserFormShema = z
  .object({
    cpf: z.string().refine(
      (value) => {
        const cleanedValue = value.replace(/[.-]/g, "");
        return cleanedValue.length === 11 && /^\d{11}$/.test(cleanedValue);
      },
      { message: "CPF inválido" }
    ),
    passwordHash: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
  })
  .transform((field) => ({
    cpf: field.cpf.replace(/[^0-9]/g, ""),
    passwordHash: field.passwordHash,
  }));

type SignInUser = z.infer<typeof signInUserFormShema>;

export function SignInForm() {
  const router = useRouter();
  const notify = useNotify();

  const createLogin = useForm<SignInUser>({
    resolver: zodResolver(signInUserFormShema),
  });

  const {
    formState: { isSubmitting },
    handleSubmit,
  } = createLogin;

  async function handleSignInUser({ cpf, passwordHash }: SignInUser) {
    try {
      await api.post("/signIn", { cpf, passwordHash });
      notify({ type: "success", message: "Acesso realizado!" });
      router.push("/painel");
    } catch (error: any) {
      if (error.response) {
        return notify({
          type: "error",
          message: error.response.data.message || "Erro ao realizar acesso",
        });
      }
    }
  }
  return (
    <FormProvider {...createLogin}>
      <form
        onSubmit={handleSubmit(handleSignInUser)}
        className="flex flex-col items-center justify-center gap-4"
      >
        <div className="flex flex-col items-center gap-4">
          <Image src={imgLogo} alt="Logo" className="w-28" />
          <h4 className="text-h4">Entre na sua conta</h4>
        </div>
        <div className="flex w-72 flex-col items-center gap-8">
          <div className="flex w-full flex-col gap-4">
            <Form.Field>
              <Form.Label>CPF</Form.Label>
              <Form.TextInput
                mask="999.999.999-99"
                placeholder="Digite seu CPF"
                name="cpf"
                type="text"
              />
              <Form.ErrorMessage field="cpf" />
            </Form.Field>
            <Form.Field>
              <Form.Label>Senha</Form.Label>
              <Form.PasswordInput
                placeholder="Digite sua senha"
                name="passwordHash"
              />
              <Form.ErrorMessage field="passwordHash" />
            </Form.Field>
          </div>

          <div className="flex w-full flex-col gap-4 text-center">
            <ButtonPrimary
              title="Entrar"
              variant="container"
              type="submit"
              loading={isSubmitting}
              className=" w-full justify-center"
            >
              Entrar
            </ButtonPrimary>
            <p className="font-inter text-xs font-normal text-slate-500">
              Ainda não tem uma conta?{" "}
              <a
                className="cursor-pointer text-second underline"
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
