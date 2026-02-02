"use client";
import { ChangeEvent } from "react";
import SelectBase from "@/components/private/Search/Select/SelectBase";
import InputBase from "@/components/private/Search/Input/InputBase";
import { queryClient } from "@/provider/query.provider";
import { User } from "@/hooks/Access/User/useAuth";

interface FilterConvenioProps {
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
}

export default function TableFilterConvenio({ onChange }: FilterConvenioProps) {
  const user = queryClient.getQueryData("authUser") as User;

  return (
    <div className="flex gap-2">
      <div className="flex flex-wrap gap-2 basis-[fit-content]">
        {user?.role === 'ADMIN' && (
          <div className="w-44">
            <InputBase
              name="search"
              label="Buscar"
              placeholder="Convênio, Banco, Agência..."
              onChange={onChange}
            />
          </div>
        )}
        <div className="w-44">
          <InputBase
            name="convenio"
            label="Convênio"
            placeholder="Número do convênio"
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
