import { DirectoryTable } from '@/components/table/Directories'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function Home() {
  const isAuthenticated = cookies().get('token')?.value

  if (!isAuthenticated) {
    return redirect('/signIn')
  }
  return (
    <div>
      <DirectoryTable />
    </div>
  )
}
