import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { PCATable } from '@/components/table/PCA'
import Header from '@/components/Header'

export default function PCA() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }

  return (
    <div className="flex flex-col gap-6">
      <Header title="PCA" />
      <PCATable />
    </div>
  )
}
