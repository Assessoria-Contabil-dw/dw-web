import { AdvocateTable } from '@/components/Advocate'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Header'

export default function Advocate() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }

  return (
    <div className="flex flex-col gap-6">
      <Header title="Tabela de Advogados" />
      <AdvocateTable />
    </div>
  )
}
