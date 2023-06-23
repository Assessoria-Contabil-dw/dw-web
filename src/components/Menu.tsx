import { Squirrel } from 'lucide-react'
import { NavigationMenu } from './Navigation'
import { Logout } from './Logout'

export default function Menu() {
  return (
    <div className="flex h-screen flex-col justify-between gap-8 bg-primary p-4 shadow-sm">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2 text-blue-900">
          <Squirrel size={32} />
          <h2 className="text-blue-900">Contabilidade</h2>
        </div>
        <NavigationMenu />
      </div>
      <Logout />
    </div>
  )
}
