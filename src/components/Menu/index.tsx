import PermitSelect from './PermitSelect'

export default function Menu() {
  return (
    <aside className="sticky flex h-[calc(100vh-2.6rem)] min-w-[200px] flex-col  gap-4 overflow-x-auto border-r-[1px] border-zinc-300 bg-white p-4 ">
      <PermitSelect />
    </aside>
  )
}
