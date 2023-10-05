'use client'
import { SignInForm } from '@/components/pages/SignIn'
import Image from 'next/image'
import imgContablue from '../../assets/contablue.png'
import { redirect } from 'next/navigation'
import { useAuth } from '@/lib/auth'

export default function SignIn() {
  console.log('SignIn')
  const user = useAuth()

  if (user !== null && user !== undefined) {
    return redirect('/painel')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-50">
      <div className="left-0 h-screen flex-1 bg-slate-900 p-12 text-white max-sm:hidden">
        <div className="flex h-full w-5/6 flex-col items-start justify-center gap-8">
          <div>
            <Image
              className="w-72"
              src={imgContablue}
              alt="Figura de contabilidade"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-alt text-4xl font-bold text-white">
              Contabilidade para partidos políticos
            </h2>
            <p className="font-alt text-base font-light">
              Deixe sua contabilidade partidária com uma equipe especializada.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-12">
        <SignInForm />
      </div>
    </div>
  )
}
