import { Minus, Plus } from "lucide-react";

interface ItemArrayProps {
  label: string;
  count: number;
  remover: () => void;
  append: () => void;
}

export default function ItemArray({
  label,
  count,
  remover,
  append,
}: ItemArrayProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <label className="text-sm font-sans font-medium text-slate-600">{label}</label>

      <div className="flex gap-1 justify-center items-center text-slate-500">
        <button className="hover:bg-slate-100 rounded" onClick={remover}>
          <Minus size={16} className="m-1" />
        </button>
        <label className="text-sm font-medium">{count}</label>
        <button className="hover:bg-slate-100 rounded" onClick={append}>
          <Plus size={16} className="m-1" />
        </button>
      </div>
    </div>
  );
}
