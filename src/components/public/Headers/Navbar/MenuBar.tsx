"use client"
import logo from '@/assets/logo_v2.svg';
import { NavigationItem } from "@/interfaces/types";
import { X } from "lucide-react";
import Image from 'next/image';
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MdMenu } from "react-icons/md";

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
                onClick={() => { setHidden(false) }}
                className='flex lg:hidden h-[50px]  items-center justify-center gap-2 text-base font-medium transition rounded-lg border-[1px] border-slate-200 bg-transparent p-4 text-slate-800 hover:border-transparent hover:bg-slate-100 hover:text-slate-800'
            >
                <span>
                    <MdMenu size={30} />
                </span>
            </button>

            {!hidden &&
                <div className="fixed  bg-black bg-opacity-25 w-screen !h-screen bottom-0 left-0 ">

                    <div className="flex flex-col flex-1 bg-white p-5 gap-5">
                        <div className="flex flex-1 justify-between">
                            <div className="pr-5 -ml-6">
                                <Image src={logo} className="h-12" alt="Figura de contabilidade" />
                            </div>
                            <button
                                onClick={() => { setHidden(true) }}
                                className='flex lg:hidden h-[50px]  items-center justify-center gap-2 text-base font-medium transition rounded-lg border-[1px] border-slate-200 bg-transparent p-4 text-slate-800 hover:border-transparent hover:bg-slate-100 hover:text-slate-800'
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
                                            className={` ${pathname === item.href && 'font-extrabold'} px-2 text-xl`}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            }

        </div>
    )
}