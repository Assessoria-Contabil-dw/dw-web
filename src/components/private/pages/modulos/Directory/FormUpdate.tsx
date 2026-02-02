"use client";
import { X } from "lucide-react";
import {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
  useEffect,
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
import { useMutation, useQuery } from "react-query";
import { DirectoryService } from "@/services/Directory/directory.service";
import { useNotify } from "@/components/Toast/toast";
import { queryClient } from "@/provider/query.provider";

export interface RegisterDirectoryModalProps {
  onClose: () => void;
  id: string;
}

export default function FormUpdateDirectory({
  onClose,
  id,
}: RegisterDirectoryModalProps) {
  const notify = useNotify();
  const [selectedState, setSelectedState] = useState("");

  const createDirectoryForm = useForm<directoryCreateType>({
    resolver: zodResolver(directoryShema),
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = createDirectoryForm;

  const { data, isLoading } = useQuery<{
    address: string;
    cnpj: string;
    email: string;
    phone: string;
    siteUrl: string;
    vigencyStatus: boolean;
    mailingAddress: string;
    city: {
      name: string;
      code: string;
    };
    state: {
      code: number;
      name: string;
      abbreviation: string;
    };
    party: {
      code: number;
      name: string;
    };
    typeOrg: {
      id: number;
      name: string;
    };
  }>(["directoryUpdate", id], async () => {
    return DirectoryService.getById(
      id,
      watch("partyCode"),
      watch("cityCode"),
      watch("typeOrgId")
    );
  });
  
  useEffect(() => {
    console.log(data);
    if (data) {
      reset({
        typeOrgId: data.typeOrg.id.toString(),
        vigencyStatus: data.vigencyStatus.toString(),
        partyCode: data.party.code.toString(),
        stateId: data.state.abbreviation,
        cityCode: data.city.code,
        cnpj: data.cnpj,
        mailingAddress: data.mailingAddress,
        phone: data.phone,
        email: data.email,
        siteUrl: data.siteUrl,
        address: data.address,
      });
      setSelectedState(data.state.abbreviation);
    }
  }, [data, reset]);
  
  const { mutate } = useMutation({
    mutationKey: "updateLeader",
    mutationFn: async () => {
      return DirectoryService.update(id, createDirectoryForm.getValues());
    },
    onSuccess: () => {
      notify({ type: "success", message: "Atualização realizado com sucesso!" });
      queryClient.invalidateQueries("directoryData");
      queryClient.invalidateQueries("directoryUpdate");
    },
    onError: (error: any) => {
      console.log("erro")
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

  async function handleDirectory(data: directoryCreateType) {
    console.log(data);
    mutate()
  }

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-2">
        <LoadingSecond />
      </div>
    );
  }

  return (
    <FormProvider {...createDirectoryForm}>
      <form
        onSubmit={handleSubmit(handleDirectory)}
        className="flex h-full w-full flex-col items-end overflow-y-auto p-4"
      >
        <div className="flex h-full w-full flex-col gap-4 ">
          <div className="flex flex-1 flex-col gap-4">
            <SelectTypeOrg name="typeOrgId" onSelected={data?.typeOrg.id}>
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
                  defaultChecked={data?.vigencyStatus === true}
                />

                <RadioInput
                  value="false"
                  type="radio"
                  label="Inativo"
                  name="vigencyStatus"
                  defaultChecked={data?.vigencyStatus === false}
                />
              </div>
              <Form.ErrorMessage field="vigencyStatus" />
            </Form.Field>

            <div className="flex gap-3">
              <Form.Field>
                <SelectPartyCode name="partyCode" onSelected={data?.party.code}>
                  <option value="">Selecione um partido</option>
                </SelectPartyCode>
                <Form.ErrorMessage field="partyCode" />
              </Form.Field>

              <Form.Field>
                <SelectStateCode
                  onSelected={data?.state.abbreviation}
                  name="stateId"
                  handleSearchOnChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="">Selecione um estado</option>
                </SelectStateCode>
                <Form.ErrorMessage field="stateId" />
              </Form.Field>

              <Form.Field>
                <SelectCityCode
                  name="cityCode"
                  stateId={selectedState || data?.state.abbreviation}
                  onSelected={data?.city.code}
                >
                  <option value="">Selecione uma cidade</option>
                </SelectCityCode>
                <Form.ErrorMessage field="cityCode" />
              </Form.Field>
            </div>

            <div className="flex gap-3">
              <Form.Field>
                <Form.Label htmlFor="cnpj">CNPJ</Form.Label>
                <Form.TextInput
                  type="text"
                  mask="99.999.999/9999-99"
                  placeholder="	00.000.000/0000-00"
                  defaultValue={data?.cnpj}
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
                  defaultValue={data?.mailingAddress}
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
                  defaultValue={data?.phone}
                  placeholder="Digite o telefone"
                  name="phone"
                />
                <Form.ErrorMessage field="phone" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="email">E-mail</Form.Label>
                <Form.TextInput
                  type="email"
                  defaultValue={data?.email}
                  placeholder="Digite o e-mail"
                  name="email"
                />
                <Form.ErrorMessage field="email" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="siteUrl">Site URL</Form.Label>
                <Form.TextInput
                  type="text"
                  defaultValue={data?.siteUrl}
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
                  defaultValue={data?.address}
                  placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                  name="address"
                />
                <Form.ErrorMessage field="address" />
              </Form.Field>
            </div>
          </div>

          <div className="flex gap-4">
            <ButtonPrimary title="Cancelar" variant="outline" onClick={onClose}>
              Cancelar
            </ButtonPrimary>
            <ButtonPrimary
              title="Atualizar"
              variant="fill"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingSecond /> : `Atualizar`}
            </ButtonPrimary>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
