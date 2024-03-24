interface AccessOptionsProps {
  _count?: {
    party: number;
    state: number;
    city: number;
  };
  option: number;
  setOption: (option: number) => void;
}
export default function ActiveOptions({
  _count,
  option,
  setOption,
}: AccessOptionsProps) {
  const options = [
    { title: "Nacional", count: _count?.party ?? 0},
    { title: "Estadual", count: _count?.state ?? 0}, 
    { title: "Municipal", count: _count?.city ?? 0}
  ];

  return (
    <div className="flex h-fit w-fit gap-1 rounded-lg bg-slate-100 p-1">
      {options.map((item, index) => (
        <button
          key={index}
          className={`h-fit cursor-pointer rounded-md px-2 py-1 font-sans text-xs font-medium ${
            option === index + 1
              ? "bg-white text-slate-700 shadow-sm"
              : "bg-transparent text-slate-400 hover:text-slate-700"
          }`}
          onClick={() => setOption(index + 1)}
        >
          {item.title} ({item.count})
        </button>
      ))}
    </div>
  );
}
