import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Header'
import { PartyTable } from '@/components/Party/'

export default function Party() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div className="flex flex-col gap-6">
      <Header title="Partidos" descrition="Verifique os partidos cadastrados" />
      <PartyTable />
    </div>
  )
}
