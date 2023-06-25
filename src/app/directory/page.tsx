import { DirectoryTable } from '@/components/table/Directories'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Header'

export default function Directories() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div className="flex flex-col gap-6">
      <Header title="Diretório" />
      <DirectoryTable />
    </div>
  )
}
