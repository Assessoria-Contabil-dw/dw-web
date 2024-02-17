import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  name: string;
}

export function PasswordInput({ placeholder, name, ...props }: TextInputProps) {
  const { register } = useFormContext();
  const [hidden, setHidden] = useState(true);

  const handleHidden = () => {
    console.log(hidden);
    setHidden(!hidden);
  };
  return (
    <div
      className="input-style group relative flex items-center border-none 
        outline-none"
    >
      <input
        id={name}
        type={hidden ? "password" : "text"}
        {...props}
        placeholder={placeholder}
        {...register(name)}
        className="z-10 peer absolute left-0 top-0 h-full w-[85%] border-none bg-transparent p-2
          outline-none"
      />
      <div className="input-style absolute right-0 top-0 h-full w-full bg-transparent 
      peer-focus-visible:ring-2 peer-focus-visible:ring-primary " />

      <button
        title="Mostrar senha"
        type="button"
        onClick={handleHidden}
        className="absolute right-0 top-0 flex h-full items-center justify-center rounded-sm p-2  text-slate-500 hover:text-slate-400
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {hidden ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}
