import { LoadingSecond } from "@/components/Loading/second";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ChangeEvent } from "react";

export interface PaddingProps {
  prevPage: () => void;
  nextPage: () => void;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  page: number;
  pages: number;
  isPreviousData: boolean;
  next: boolean | null;
  isFetching: boolean;
}

export default function PaddingTable({
  page,
  pages,
  isPreviousData,
  next,
  isFetching,
  nextPage,
  prevPage,
  onChange,
}: PaddingProps) {

  return (
    <div className="z-1 h-8 flex w-fit items-center space-x-2">
      <button
        className="button-arrow focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={() => prevPage()}
        disabled={page === 1}
      >
        <ChevronLeft size={18} />
      </button>
     
      <span className="text-span">{page + "..." + pages}</span>
      
      <button
        className="button-arrow focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        onClick={() => {
          if (!isPreviousData && next) {
            nextPage();
          }
        }}
        disabled={isPreviousData || !next}
      >
        <ChevronRight size={18} />
      </button>
      <select
        onChange={(e) => onChange(e)}
        className="h-full rounded-md border-[1px] border-solid border-slate-300 bg-white px-1 font-sans
         text-sm font-normal text-slate-400 hover:bg-slate-100 hover:text-slate-500
        focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <option value="15" selected>15 itens</option>
        <option value="45">45 itens</option>
        <option value="0">Todos</option>
      </select>

      {isFetching && <LoadingSecond />}
    </div>
  );
}
