import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SPCTable } from '@/components/SPC'
import Header from '@/components/Header'

export default function PCA() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }

  return (
    <div className="flex flex-col gap-6">
      <Header
        title="Prestação de Conta"
        descrition="Verifique o SPCA e SPCE de cada diretório"
      />
      <SPCTable />
    </div>
  )
}
