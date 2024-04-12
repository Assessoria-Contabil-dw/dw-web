"use client";
import { Key, LogOut, User } from "lucide-react";
import ButtonIcon from "../../../Buttons/ButtonIcon";
import { useCallback, useRef, useState } from "react";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import ModelPassword, { ModelPasswordRef } from "./ModelPassword";
import useAuth from "@/hooks/Access/User/useAuth";
import { useMutation } from "react-query";
import { UserAuthService } from "@/services/Access/User/auth.service";
import { useNotify } from "@/components/Toast/toast";
import { useRouter } from "next/navigation";

export default function ActiveAccount() {
  const user = useAuth();
  const notify = useNotify()
  const router = useRouter()

  const { mutate } = useMutation({
    mutationKey: 'logout',
    mutationFn: () => UserAuthService.postLogout(),
    onSuccess: () => {
      notify({message: 'Você saiu da sua conta', type:'success'})
      router.push('/login')
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
  })

  const [isFilter, setIsFilter] = useState(false);

  const modelPassordRef = useRef<ModelPasswordRef>(null)
  const handleModalPassword = useCallback(() => {
    modelPassordRef.current?.openModal()
  }, [])

  if (!user) return null;

  async function handleLogout() {
   mutate()
  }

  return (
    <div className="relative">
      <ModelPassword ref={modelPassordRef} />

      <ButtonIcon
        onClick={() => setIsFilter(!isFilter)}
        title="Sair"
        icon={<User size={16} />}
      />
      <div
        className={`absolute right-0 z-10 mt-1 flex w-44 flex-col gap-1 rounded-md border-[1px] bg-white shadow-md
              ${isFilter ? "block" : "hidden"}`}
      >
        <div className="flex flex-col gap-2 border-b-[1px] p-3 pb-4">
          <h5 className="text-h6 max-w-[90px] overflow-hidden text-ellipsis whitespace-nowrap">
            {user.name}
          </h5>
          <span className="text-[10px] font-medium uppercase leading-[8px] text-slate-400">
            {user.role === "CLIENT" ? "Cliente" : "Administrador"}
          </span>
        </div>

        <div className="flex flex-col gap-2 border-b-[1px] p-2">
          <ButtonPrimary
            onClick={() => handleModalPassword()}
            variant="ghost"
            className="w-full"
            title="Sair"
            startIcon={<Key size={16} />}
          >
            <span className="text-[11px] font-medium">Mudar senha</span>
          </ButtonPrimary>
        </div>

        <div className="p-2">
          <ButtonPrimary
            onClick={handleLogout}
            variant="outline"
            className="items-center justify-center w-full"
            title="Sair"
            startIcon={<LogOut size={16} />}
          >
            Sair
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
}
