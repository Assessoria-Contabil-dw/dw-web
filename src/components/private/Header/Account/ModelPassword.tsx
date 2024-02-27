import { Copy, X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import ButtonIcon from "@/components/Buttons/ButtonIcon";
import { useUserPassword } from "@/hooks/useUserData";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";
import { Form } from "@/components/Form";

export interface ModelPasswordRef {
  openModal: () => void;
  closeModal: () => void;
}

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

const ModelPassword: ForwardRefRenderFunction<ModelPasswordRef> = (
  props,
  ref
) => {
  const [isModalView, setIsModalView] = useState(false);

  const openModal = useCallback(() => {
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalView(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const methos = useForm<passwordType>({
    mode: "onSubmit",
    resolver: zodResolver(passwordSchema),
  });
  const {
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = methos;



  const { isFetching, refetch } = useUserPassword(
    watch("password")
  );

  async function onSubmit(date: passwordType) {
    await refetch();
    console.log(date);
    console.log("senhas", watch("password"));
  }

  if (!isModalView) {
    return null;
  }
  return (
    <div className="model-bg z-50">
      <div className="model-size model-size-min">
        <fieldset className="model-card">
          <div className="model-header">
            <h4 className="text-h5">Mudar senha</h4>
            <button onClick={closeModal} className="model-close">
              <X size={20} />
            </button>
          </div>

          <FormProvider {...methos}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-4 border-none"
            >
              <div className="flex gap-2">
                <div className="w-full">
                  <Form.PasswordInput
                    placeholder="Digite sua nova senha"
                    name="password"
                  />
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
              </div>

              <div className="flex justify-end gap-2">
                <ButtonPrimary
                  title="Cancelar"
                  variant="ghost"
                  type="button"
                  onClick={closeModal}
                >
                  Cancelar
                </ButtonPrimary>
                <ButtonPrimary
                  title="Confirmar"
                  variant="fill"
                  type="submit"
                  disabled={!isValid}
                  loading={isFetching}
                >
                  Confirmar
                </ButtonPrimary>
              </div>
            </form>
          </FormProvider>
        </fieldset>
      </div>
    </div>
  );
};

export default forwardRef(ModelPassword);
