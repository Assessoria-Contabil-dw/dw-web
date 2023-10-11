import { NavigationMenu } from './Navigation'
import { Links } from './Links'

export default function Menu() {
  return (
    <aside className="2 sticky flex h-[calc(100vh-2.6rem)] min-w-[200px] flex-col gap-8 overflow-x-auto border-r-[1px] border-zinc-300 bg-white p-4 ">
      <NavigationMenu />
      <Links />
    </aside>
  )
}
