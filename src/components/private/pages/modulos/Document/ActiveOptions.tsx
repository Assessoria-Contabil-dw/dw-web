interface AccessOptionsProps {
  option: number
  setOption: (option: number) => void
}
export default function ActiveOptions({
  option,
  setOption,
}: AccessOptionsProps) {
  const options = ['Preencher', 'Dicionário']

  return (
    <div className="flex h-fit w-fit gap-1 rounded-lg bg-slate-100 p-1">
      {options.map((text, index) => (
        <button
          key={index}
          className={`h-fit cursor-pointer rounded-md px-2 py-1 font-sans text-xs font-medium ${
            option === index + 1
              ? 'bg-white text-slate-700 shadow-sm'
              : 'bg-transparent text-slate-400 hover:text-slate-700'
          }`}
          onClick={() => setOption(index + 1)}
        >
          {text}
        </button>
      ))}
    </div>
  )
}
