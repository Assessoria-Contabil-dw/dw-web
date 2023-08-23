import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Menu/Header'
import { RelatoryView } from '@/components/Relatory'

export default function Relatory() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Relatórios"
        descrition="Gere relatorios de acordo com as suas necessidades"
      />
      <RelatoryView />
    </div>
  )
}
