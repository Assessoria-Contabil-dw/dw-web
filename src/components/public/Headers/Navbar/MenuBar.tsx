'use client'
import logo from '@/assets/logo-vertical-color.svg'
import { NavigationItem } from '@/interfaces/types'
import { X } from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { MdMenu } from 'react-icons/md'

export default function MenuBar({ menu }: { menu: NavigationItem[] }) {
  const [hidden, setHidden] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  function handleClickItem(item: NavigationItem) {
    setHidden(true)
    router.push(item.href)
  }

  return (
    <div className="flex">
      <button
        onClick={() => {
          setHidden(false)
        }}
        className="flex h-[50px] items-center  justify-center gap-2 rounded-lg border-[1px] border-slate-200 bg-transparent p-4 text-base font-medium text-slate-800 transition hover:border-transparent hover:bg-slate-100 hover:text-slate-800 lg:hidden"
      >
        <span>
          <MdMenu size={30} />
        </span>
      </button>

      {!hidden && (
        <div className="fixed  inset-0 h-full  w-screen bg-black bg-opacity-25 ">
          <div className="flex flex-1 flex-col gap-5 bg-white p-5">
            <div className="flex flex-1 justify-between">
              <div className="-ml-6 pr-5">
                <Image
                  src={logo}
                  className="h-12"
                  alt="Figura de contabilidade"
                />
              </div>
              <button
                onClick={() => {
                  setHidden(true)
                }}
                className="flex h-[50px] items-center  justify-center gap-2 rounded-lg border-[1px] border-slate-200 bg-transparent p-4 text-base font-medium text-slate-800 transition hover:border-transparent hover:bg-slate-100 hover:text-slate-800 lg:hidden"
              >
                <span>
                  <X size={30} />
                </span>
              </button>
            </div>
            <ul className="flex flex-col gap-3 py-5">
              {menu.map((item, index) => {
                return (
                  <li key={index}>
                    <button
                      onClick={() => handleClickItem(item)}
                      className={` ${
                        pathname === item.href && 'font-extrabold'
                      } px-2 text-xl`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
