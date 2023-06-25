import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SignInForm } from '@/components/form/SignIn'

export default function SignIn() {
  // verifica se o usuario ainda tem token ativo
  const isAuthenticated = cookies().get('token')?.value

  if (isAuthenticated) {
    return redirect('/')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-zinc-50">
      <div className="flex w-72 flex-col items-center justify-center gap-8">
        <h1>Login</h1>
        <SignInForm />
      </div>
    </div>
  )
}
