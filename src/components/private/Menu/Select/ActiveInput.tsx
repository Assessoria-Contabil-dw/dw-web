import { ChevronsUpDown } from "lucide-react";
import React from "react";

interface ActiveInputProps {
  onClick?: (e: any) => void;
  moduleName?: string | null;
}

const ActiveInput = ({
  onClick,
  moduleName,
}: ActiveInputProps) => (
  <div className="relative">
    <input
      onClick={onClick}
      type="checkbox"
      className="peer/access absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
    />
    <div>
      <label htmlFor="access" className="text-label cursor-pointer">
        Acesso
      </label>
    </div>
    <div className="input-style flex items-center justify-between">
      <div>{moduleName ? moduleName : "Selecione o acesso"}</div>
      <ChevronsUpDown size={16} className="text-slate-400" />
    </div>
  </div>
);

export default ActiveInput;
