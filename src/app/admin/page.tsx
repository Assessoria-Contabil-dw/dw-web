import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Menu/Header'
import { Acess } from '@/components/Acess'

export default function Admin() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div className="flex flex-col gap-6">
      <Header title="Painel usuarios" />
      <Acess />
    </div>
  )
}
