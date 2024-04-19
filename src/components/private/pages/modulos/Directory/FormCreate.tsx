"use client";
import { X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Form } from "../../../../Form";
import { LoadingSecond } from "@/components/Loading/second";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import { directoryCreateType, directoryShema } from "./@type/zod.type";
import SelectTypeOrg from "@/components/private/Form/Selects/SelectTypeOrg";
import SelectPartyCode from "@/components/private/Form/Create/Party";
import SelectStateCode from "@/components/private/Form/Create/State";
import SelectCityCode from "@/components/private/Form/Create/City";
import { RadioInput } from "@/components/Form/Radio";
import {
  useDirectoryCreate,
  useDirectoryData,
} from "@/hooks/Directory/useDirectory";

export interface RegisterDirectoryModalProps {
  openModal: () => void;
  closeModal: () => void;
}

const RegisterDirectoryModel: ForwardRefRenderFunction<
  RegisterDirectoryModalProps
> = (props, ref) => {
  const [selectedState, setSelectedState] = useState("");
  const [isModalView, setIsModalView] = useState(false);

  const openModal = useCallback(() => {
    setIsModalView(true);
  }, []);

  const closeModal = useCallback(() => {
    resetField("typeOrgId");
    resetField("partyCode");
    resetField("cityCode");
    resetField("address");
    resetField("cnpj");
    resetField("phone");
    resetField("siteUrl");
    resetField("email");
    resetField("mailingAddress");
    resetField("vigencyStatus");
    resetField("stateId");

    setIsModalView(false);
  }, []);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const createDirectoryForm = useForm<directoryCreateType>({
    defaultValues: {
      typeOrgId: "",
      partyCode: "",
      cityCode: "",
      address: "",
      cnpj: "",
      phone: "",
      siteUrl: "",
      email: "",
      mailingAddress: "",
      vigencyStatus: "true",
    },
    resolver: zodResolver(directoryShema),
  });

  const {
    handleSubmit,
    watch,
    resetField,
    formState: { isSubmitting },
  } = createDirectoryForm;

  const { isLoading, refetch } = useDirectoryCreate(
    watch("cnpj"),
    watch("partyCode"),
    watch("cityCode"),
    watch("typeOrgId"),
    watch("vigencyStatus"),
    watch("address"),
    watch("siteUrl"),
    watch("email"),
    watch("phone"),
    watch("mailingAddress")
  );
  async function handleDirectory(data: directoryCreateType) {
    console.log(data);
    await refetch();
  }

  if (!isModalView) {
    return null;
  }

  return (
    <div className="model-bg">
      <div className="model-size model-size-full">
        <FormProvider {...createDirectoryForm}>
          <form
            onSubmit={handleSubmit(handleDirectory)}
            className="flex h-full w-full flex-col items-end"
          >
            <div className="model-card">
              <div className="model-header">
                <div>
                  <h4 className="text-h4">Cadastrar Diretório</h4>
                  <span className="text-span">Cadastre um diretório</span>
                </div>
                <button onClick={closeModal} className="model-close">
                  <X size={20} />
                </button>
              </div>
              <div className="model-body">
                <div className="flex flex-1 flex-col gap-4">
                  <SelectTypeOrg name="typeOrgId">
                    <option value="">Selecione um tipo de organização</option>
                  </SelectTypeOrg>
                  <Form.ErrorMessage field="typeOrgId" />

                  <Form.Field>
                    <Form.Label htmlFor="vigencyStatus">Vigencia</Form.Label>
                    <div className="flex gap-4">
                      <RadioInput
                        value="true"
                        type="radio"
                        label="Ativa"
                        name="vigencyStatus"
                      />

                      <RadioInput
                        value="false"
                        type="radio"
                        label="Inativo"
                        name="vigencyStatus"
                      />
                    </div>
                    <Form.ErrorMessage field="vigencyStatus" />
                  </Form.Field>

                  <div className="flex gap-3">
                    <SelectPartyCode name="partyCode">
                      <option value="">Selecione um partido</option>
                    </SelectPartyCode>
                    <Form.ErrorMessage field="partyCode" />

                    <SelectStateCode
                      name="stateId"
                      handleSearchOnChange={(e) =>
                        setSelectedState(e.target.value)
                      }
                    >
                      <option value="">Selecione um estado</option>
                    </SelectStateCode>
                    <Form.ErrorMessage field="stateId" />

                    <SelectCityCode name="cityCode" stateId={selectedState}>
                      <option value="">Selecione uma cidade</option>
                    </SelectCityCode>
                    <Form.ErrorMessage field="cityCode" />
                  </div>

                  <div className="flex gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="cnpj">CNPJ</Form.Label>
                      <Form.TextInput
                        type="text"
                        mask="99.999.999/9999-99"
                        placeholder="	00.000.000/0000-00"
                        name="cnpj"
                      />
                      <Form.ErrorMessage field="cnpj" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="mailingAddress">
                        Endereço de Correspondência
                      </Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o endereço de correspondência"
                        name="mailingAddress"
                      />
                      <Form.ErrorMessage field="mailingAddress" />
                    </Form.Field>
                  </div>

                  <div className="flex gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="phone">Telefone</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o telefone"
                        name="phone"
                      />
                      <Form.ErrorMessage field="phone" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="email">E-mail</Form.Label>
                      <Form.TextInput
                        type="email"
                        placeholder="Digite o e-mail"
                        name="email"
                      />
                      <Form.ErrorMessage field="email" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="siteUrl">Site URL</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o link do site"
                        name="siteUrl"
                      />
                      <Form.ErrorMessage field="siteUrl" />
                    </Form.Field>
                  </div>

                  <div>
                    <Form.Field>
                      <Form.Label htmlFor="address">Endereço</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                        name="address"
                      />
                      <Form.ErrorMessage field="address" />
                    </Form.Field>
                  </div>
                </div>

                <div className="flex gap-4">
                  <ButtonPrimary
                    title="Cancelar"
                    variant="outline"
                    onClick={closeModal}
                  >
                    Cancelar
                  </ButtonPrimary>
                  <ButtonPrimary
                    title="Cadastrar"
                    variant="fill"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <LoadingSecond /> : `Cadastrar`}
                  </ButtonPrimary>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default forwardRef(RegisterDirectoryModel);
