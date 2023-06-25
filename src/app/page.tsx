import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import Header from '@/components/Header'

export default function Home() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div>
      <Header title="Dashboard" />
      <p>Informações resumidas como:</p>
      <ul>
        <li>Numero de clientes</li>
        <li>Numero de diretorios</li>
        <li>Numero de representantes e advogados</li>
        <li>Numero de partidos</li>
      </ul>
    </div>
  )
}
