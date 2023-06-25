import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Header'
import { LawFirmTable } from '@/components/table/LawFirm'

export default function LawFirm() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div className="flex flex-col gap-6">
      <Header title="Escritório" />
      <LawFirmTable />
    </div>
  )
}
