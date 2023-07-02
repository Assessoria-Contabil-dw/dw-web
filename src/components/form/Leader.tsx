'use client'

import { X } from 'lucide-react'
import { TextInput } from '../inputs/Text'
import { ImgInput } from '../inputs/Img'
import { RadioInput } from '../inputs/Radio'
import { z } from 'zod'
import { api } from '@/lib/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
interface RegisterLeaderModalProps {
  isOpen: boolean
  onClose: () => void
}

const leaderFormShema = z.object({
  name: z.string().min(3).nonempty('O nome é obrigatório'),
  cpf: z
    .string()
    .min(11)
    .max(11, 'O CPF deve ter 11 caracteres')
    .nonempty('O CPF é obrigatório'),
  birthday: z.date().optional(),
  rg: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(11).max(11).optional(),
  address: z.string().min(3).optional(),
  signatureUrl: z.string().url(),
  title: z.string().min(3).max(25),
  nationality: z.enum(['BRASILEIRO', 'ESTRANGEIRO']),
  status: z.enum(['CASADO', 'DIVORCIADO', 'SOLTEIRO', 'VIUVO']),
  profession: z.string().min(3).max(25).optional(),
})

type Leader = z.infer<typeof leaderFormShema>

export function LeaderForm({ onClose, isOpen }: RegisterLeaderModalProps) {
  // cadastrar representante
  const { register, handleSubmit, watch } = useForm<Leader>({
    resolver: zodResolver(leaderFormShema),
  })
  const groupNationality = watch('nationality')
  async function handleAddLeader({
    name,
    cpf,
    birthday,
    nationality,
    signatureUrl,
    status,
    title,
    address,
    email,
    phone,
    profession,
    rg,
  }: Leader) {
    try {
      const response = await api.post('/leader', {
        name,
        cpf,
        birthday,
        nationality: groupNationality,
        signatureUrl,
        status,
        title,
        address,
        email,
        phone,
        profession,
        rg,
      })

      console.log(response.data)
    } catch {}
  }

  if (!isOpen) {
    return null
  }
  function handleCloseModal() {
    onClose()
  }

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <form
          onChange={handleSubmit(handleAddLeader)}
          className="flex h-full w-full flex-col items-end  p-1"
        >
          <div className="flex h-full w-full flex-col justify-between gap-6 overflow-y-auto p-8">
            <div className="flex flex-col gap-6">
              <div className="flex w-full items-start justify-between border-b-[1px]">
                <div>
                  <h4>Cadastrar Representante</h4>
                  <span>Insira as informações de um representante</span>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex gap-3">
                  <TextInput
                    label="Nome"
                    type="text"
                    placeholder="Digite o nome completo"
                    {...register('name')}
                  />
                  <TextInput
                    label="CPF"
                    type="text"
                    placeholder="Digite o CPF"
                    {...register('cpf')}
                  />
                  <TextInput label="RG" type="text" placeholder="Digite o RG" />
                </div>
                <TextInput
                  label="Endereço"
                  type="text"
                  placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                  {...register('address')}
                />
                <div className="flex gap-3">
                  <TextInput
                    label="Telefone"
                    type="text"
                    placeholder="Digite o telefone"
                    {...register('phone')}
                  />
                  <TextInput
                    label="E-mail"
                    type="text"
                    placeholder="Digite o email"
                    {...register('email')}
                  />
                  <TextInput
                    label="Profissão"
                    type="text"
                    placeholder="Digite a profissão"
                    {...register('profession')}
                  />
                </div>

                <div className="flex gap-8">
                  <label className="flex flex-col gap-1 whitespace-nowrap text-sm font-semibold">
                    Situação Cívil
                    <div>
                      <RadioInput
                        type="radio"
                        value="SOLTEIRO"
                        label="Solteiro"
                        name="status"
                      />
                      <RadioInput
                        type="radio"
                        value="CASADO"
                        label="Casado"
                        name="status"
                      />
                      <RadioInput
                        type="radio"
                        value="DIVORCIADO"
                        label="Divorciado"
                        name="status"
                      />
                      <RadioInput
                        type="radio"
                        value="VIÚVO"
                        label="Viúvo"
                        name="status"
                      />
                    </div>
                  </label>
                  <label
                    {...register('nationality')}
                    className="flex flex-col gap-1 text-sm font-semibold"
                  >
                    Nacionalidade
                    <div>
                      <RadioInput
                        type="radio"
                        value="BRASILEIRO"
                        label="Brasileiro"
                        {...register('nationality', { required: true })}
                      />
                      <RadioInput
                        type="radio"
                        value="ESTRANGEIRO"
                        label="Estrangeiro"
                        {...register('nationality', { required: true })}
                      />
                    </div>
                  </label>
                  <ImgInput
                    label="Assinatura"
                    placeholder="Anexar assinatura"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleCloseModal}
                type="submit"
                className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-primary text-white hover:bg-primary-hover "
              >
                Cadastrar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
