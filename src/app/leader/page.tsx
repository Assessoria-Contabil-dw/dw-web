import { LeaderTable } from '@/components/Leader/'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Menu/Header'

export default function Leader() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Representantes"
        descrition="Verificar representantes cadastrados"
      />
      <LeaderTable />
    </div>
  )
}
