import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Menu/Header'
import { Party } from '@/components/Party/'

export default function PartyPage() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div className="flex flex-col gap-6">
      <Header title="Partidos" descrition="Verifique os partidos cadastrados" />
      <Party />
    </div>
  )
}
