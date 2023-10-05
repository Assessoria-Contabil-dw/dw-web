import { Eye, EyeOff } from 'lucide-react'
import { InputHTMLAttributes, useState } from 'react'
import { useFormContext } from 'react-hook-form'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string
  name: string
}

export function PasswordInput({ placeholder, name, ...props }: TextInputProps) {
  const { register } = useFormContext()
  const [hidden, setHidden] = useState(true)

  const handleHidden = () => {
    console.log(hidden)
    setHidden(!hidden)
  }
  return (
    <div className="relative flex items-center rounded border border-slate-300 bg-white pr-2 ">
      <input
        id={name}
        type={hidden ? 'password' : 'text'}
        {...props}
        placeholder={placeholder}
        {...register(name)}
        className="border-none !bg-transparent"
      />
      <button
        type="button"
        onClick={handleHidden}
        className="h-8 w-8 rounded-md p-0 hover:bg-slate-200"
      >
        {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}
