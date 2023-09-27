import { NavigationMenu } from './Navigation'
import { Links } from './Links'
import imgLogo from '../../assets/logo.png'
import Image from 'next/image'

export default function Menu() {
  return (
    <div className="flex h-screen flex-col justify-between gap-8 border-r-[1px] border-zinc-300 bg-white p-4">
      <div className="flex h-full flex-col  gap-8">
        <div className="mt-2 flex items-center justify-start gap-2 text-gray-900">
          <Image src={imgLogo} alt="Logo da plataform" width={50} />
          <div className="flex flex-col">
            <h2 className="leading-5">DW</h2>
            <span className="font-alt">Assessoria Contábil</span>
          </div>
        </div>
        <div className="flex h-full flex-col justify-between">
          <NavigationMenu />
          <Links />
        </div>
      </div>
    </div>
  )
}
