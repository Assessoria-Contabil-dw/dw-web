import { LoadingSecond } from "@/components/Loading/second";
import { LeadersService } from "@/services/Leader/leader.service";
import { useQuery } from "react-query";

interface ILeader {
  id: string;
}
export function ViewLeader({ id }: ILeader) {
  const { data, isLoading } = useQuery<{
    name: string;
    cpf: string;
    rg?: string;
    title?: string;
    status?: string;
    birthday?: string;
    email?: string;
    phone?: string;
    address?: string;
    signatureUrl?: string;
    profession?: string;
    importantPasswords?: {
      name: string;
      passwordHash: string;
    }[];
  }>(
    ["leader", id],
    async () => {
      return await LeadersService.getById(id);
    },
    {
      enabled: !!id,
    }
  );

  if (isLoading) {
    return (
      <div className="mt-4 flex items-center justify-center gap-2">
        <LoadingSecond />
        <i className="text-gray-500">Carregando...</i>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-auto p-2">
      <fieldset className="flex flex-col gap-2 rounded-md border-[1px] p-3">
        <legend className="text-label">Informações do Presidente</legend>

        <div className="flex items-start justify-between gap-4 max-sm:flex-col">
          <div className="flex flex-col gap-1">
            <h5 className="text-h5">Nome</h5>
            {data?.name ? (
              <p className="text-xs font-semibold text-secondHover">
                {data?.name}
              </p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-h5">Data de Nascimento</h5>
            {data?.birthday ? (
              <p className="text-xs text-slate-500">{data?.birthday}</p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>

       
        </div>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-1">
            <h5 className="text-h5">RG</h5>
            {data?.rg ? (
              <p className="text-xs text-slate-500">{data?.rg}</p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-h5">CPF</h5>
            {data?.cpf ? (
              <p className="text-xs text-slate-500">{data?.cpf}</p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-h5">Título</h5>
            {data?.title ? (
              <p className="text-xs text-slate-500">{data?.title}</p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <h5 className="text-h5">Endereço</h5>
          {data?.address ? (
            <p className="text-xs text-slate-500">{data?.address}</p>
          ) : (
            <span className="text-span">Não cadastrado</span>
          )}
        </div>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="flex flex-col gap-1">
            <h5 className="text-h5">E-mail</h5>
            {data?.email ? (
              <p className="text-xs text-slate-500">{data?.email}</p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-h5">Telefone</h5>
            {data?.phone ? (
              <p className="text-xs text-slate-500">{data?.phone}</p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-h5">Status</h5>
            {data?.status ? (
              <p className="text-xs text-slate-500">{data?.status}</p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <h5 className="text-h5">Profissão</h5>
            {data?.profession ? (
              <p className="text-xs text-slate-500">{data?.profession}</p>
            ) : (
              <span className="text-span">Não cadastrado</span>
            )}
          </div>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2 rounded-md border-[1px] p-3">
        <legend className="text-label">Assinatura</legend>

        <div className="flex flex-col gap-1">
          {data?.signatureUrl ? (
            <picture>
              <img
                src={`https://arquivos.contabilidadepartidaria.com.br/assinaturas/${data?.signatureUrl}`}
                alt="Assinatura"
                className="pointer-events-none h-20 w-full bg-slate-200 object-contain"
                width={100}
                height={100}
              />
            </picture>
          ) : (
            <span className="text-span">Não cadastrado</span>
          )}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-2 rounded-md border-[1px] p-3">
        <legend className="text-label">Senhas confidenciais</legend>

        <div className="flex flex-col items-start justify-between gap-4">
          {data?.importantPasswords && data?.importantPasswords?.length > 0 ? (
            data?.importantPasswords.map((item, index) => (
              <div key={index} className="flex gap-1">
                <h5 className="text-h5">{item.name}: </h5>
                <p className="text-xs text-slate-500">{item.passwordHash}</p>
              </div>
            ))
          ) : (
            <span className="text-span">Não cadastrado</span>
          )}
        </div>
      </fieldset>
    </div>
  );
}
