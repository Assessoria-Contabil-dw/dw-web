import { Squirrel } from 'lucide-react'
import { NavigationMenu } from './Navigation'

export default function Menu() {
  return (
    <div className="flex h-screen flex-col justify-between gap-8 border-r-[1px] border-zinc-300 bg-white p-4">
      <div className="flex flex-col gap-10">
        <div className="mt-2 flex items-center justify-start gap-2 text-gray-900">
          <Squirrel size={32} className="text-primary" />
          <div className="flex flex-col">
            <h2 className="leading-5">DW</h2>
            <span className="font-alt">Assessoria Contábil</span>
          </div>
        </div>
        <NavigationMenu />
      </div>
    </div>
  )
}
