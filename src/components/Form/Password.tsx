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
        className="input-style w-full border-none outline-none"
      />
      <button
        type="button"
        onClick={handleHidden}
        className="absolute text-slate-500 right-0 top-0 flex h-full items-center justify-center p-2 hover:text-slate-400"
      >
        {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}
