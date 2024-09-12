import { LoadingSecond } from "@/components/Loading/second";
import { ChevronLeft, ChevronRight, ChevronsRight, ChevronsLeft } from "lucide-react";
import { ChangeEvent } from "react";

export interface PaddingProps {
  prevPage: () => void;
  nextPage: () => void;
  setPage?: (data: any) => void;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  page: number;
  pages: number;
  result?: number;
  count?: number;
  isPreviousData: boolean;
  next: boolean | null;
  isFetching: boolean;
}

export default function PaddingTable({ page, pages, result, count, isPreviousData, next, isFetching, nextPage, prevPage, onChange, setPage }: PaddingProps) {

  const gerarPaginas = () => {
    const paginas = [];
    const inicio = Math.max(1, page - 3); // Calcula a primeira página a ser exibida (no mínimo 1)
    const fim = Math.min(pages, page + 3); // Calcula a última página a ser exibida (no máximo pages)

    for (let i = inicio; i <= fim; i++) {
      paginas.push(
        <button
          key={i}
          onClick={() => {
            if (setPage) {
              setPage(i)
            }
          }}
          disabled={i === page || isFetching}
          className={`button-arrow focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 text-xs px-2 focus-visible:ring-primary font-bold ${i === page ? ' bg-slate-200' : ''}`}
        >
          {i}
        </button>
      );
    }
    return paginas;
  }

  console.log(next)

  return (
    <div className="z-1 h-8 flex w-fit items-center space-x-2">
      {setPage && <button
        className="button-arrow focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 font-bold focus-visible:ring-primary"
        onClick={() => {
          if (setPage)
            setPage(1)
        }}
        disabled={page === 1 || isFetching}
      >
        <ChevronsLeft size={16} />
      </button>}

      <button
        className="button-arrow focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 font-bold focus-visible:ring-primary"
        onClick={() => prevPage()}
        disabled={page === 1 || isFetching}
      >
        <ChevronLeft size={16} />
      </button>
     
      {gerarPaginas()}
      
      <button
        className="button-arrow focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 font-bold focus-visible:ring-primary"
        onClick={() => {
          if (!isPreviousData && next) {
            nextPage();
          }
        }}
        disabled={isPreviousData || !next || isFetching}
      >
        <ChevronRight size={16} />
      </button>

      {setPage && <button
        className="button-arrow focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 font-bold focus-visible:ring-primary"
        onClick={() => {
          if (!isPreviousData && next && setPage) {
            setPage(pages);
          }
        }}
        disabled={isPreviousData || !next || isFetching}
      >
        <ChevronsRight size={16} />
      </button>}

      <select
        onChange={(e) => onChange(e)}
        disabled={isFetching}
        className="h-full rounded-md border-[1px] border-solid border-slate-300 bg-white px-1 font-sans
         text-sm font-normal text-slate-400 hover:bg-slate-100 hover:text-slate-500
        focus-visible:border-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <option value="15" selected>15 itens</option>
        <option value="30">30 itens</option>
        <option value="50">50 itens</option>
      </select>

      {isFetching && <LoadingSecond />}
    </div>
  );
}
