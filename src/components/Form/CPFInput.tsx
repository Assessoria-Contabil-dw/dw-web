import { InputHTMLAttributes, useEffect } from 'react'
import { useFormContext, Controller, Control } from 'react-hook-form'
import InputMask from 'react-input-mask';


interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    placeholder?: string
    name: string
}

export function CPFInput({
    placeholder,
    name,
    ...props
}: TextInputProps) {
    const { register } = useFormContext()

    //        maskChar="" Aparece os delimitadores a medida os caracteres são digitando.
    //  default (Sem esse parametro) -> Aparece todo os delimitadores e _ em campos nao preenchidos

    useEffect(() => {
        console.log(name)
    }, [name])
    return (
        <InputMask
            placeholder={placeholder}
            mask="999.999.999-99"
            alwaysShowMask={false}
            maskChar=""
            id={name}
            {...register(name)}
            {...props}
            type='text'
        />

    )
}
