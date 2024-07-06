import ButtonSecondary from "@/components/Buttons/ButtonSecondary";

interface MenuProps {
  id?: number;
  title?: string;
  relatoryOption: number;
  setRelatory: (id: number) => void;
  progressBar: (id: number) => void;
}

const itens = [
  {
    id: 1,
    title: "Diretórios e Status",
  },
  {
    id: 2,
    title: "Diretórios com Vigência próxima",
  },
  {
    id: 3,
    title: "Diretórios e Representantes",
  },
  {
    id: 4,
    title: "Diretórios e SPC's",
  },
];

export function Menu({ relatoryOption, setRelatory, progressBar }: MenuProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid h-full grid-cols-4 gap-4">
        {itens.map((item) => (
          <button
            onClick={() => setRelatory(item.id)}
            key={item.id}
            className={`${relatoryOption === item.id ? "border-solid border-primary border-4" : "border-[1px]"}
            min-h-20 flex h-16 cursor-pointer flex-col items-center justify-center rounded-md  bg-white px-2 py-2 hover:bg-slate-100`}
          >
            <h3 className="justify-end text-center font-mono text-xs font-semibold leading-tight text-slate-700">
              {item.title}
            </h3>
          </button>
        ))}
      </div>
      <div className="flex w-full justify-end">
        <ButtonSecondary
          onClick={() => progressBar(2)}
          title="Próximo"
          variant="fill"
          disabled={relatoryOption === 0}
        >
          Preencher
        </ButtonSecondary>
      </div>
    </div>
  );
}
