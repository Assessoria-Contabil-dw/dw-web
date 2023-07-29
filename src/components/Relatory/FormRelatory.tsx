import { Form } from '../Form'
import { DirectoryProps, PartyProps, VigencyProps } from '@/lib/types'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { useForm, FormProvider } from 'react-hook-form'
import { useState } from 'react'

import { Loading } from '../Form/Loading'

const RelatoryViewFormSchema = z.object({
  partyId: z.string().nonempty('Selecione o partido'),
  directoryId: z.string().nonempty('Selecione o diretório'),
  vigencyId: z.string().nonempty('Selecione a vigência'),
  year: z.coerce.number().max(dayjs().year(), 'Ano inválido'),
})

type RelatoryFormData = z.infer<typeof RelatoryViewFormSchema>

export function FormRelatory() {
  const [error, setError] = useState<string | null>(null)
  const [party, setParty] = useState<PartyProps[]>([])
  const [directory, setDirectory] = useState<DirectoryProps[]>([])
  const [vigency, setVigency] = useState<VigencyProps[]>([])

  const [selectedDirectory, setSelectedDirectory] = useState('')
  const [selectedParty, setSelectedParty] = useState('')
  const [selectedVigency, setSelectedVigency] = useState('')

  const createRelatoryForm = useForm<RelatoryFormData>({
    resolver: zodResolver(RelatoryViewFormSchema),
  })

  async function handleRelatoryCreate(data: RelatoryFormData) {
    console.log(data)
    setError(null)
    setDirectory([])
    setParty([])
    setVigency([])
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createRelatoryForm
  return (
    <div className="w-96">
      <FormProvider {...createRelatoryForm}>
        <form
          onSubmit={handleSubmit(handleRelatoryCreate)}
          className="flex flex-col gap-3"
        >
          <Form.Field>
            <Form.Label>Partido</Form.Label>
            <Form.Field>
              <Form.SelectInput
                onChange={(e) => setSelectedParty(e.target.value)}
                value={selectedParty}
                type="text"
                placeholder="Selecione o partido"
                name="partyId"
              >
                {party.map((party, index) => {
                  return (
                    <option key={index} value={party.code}>
                      {party.code} {party.abbreviation}
                    </option>
                  )
                })}
              </Form.SelectInput>
              <Form.ErrorMessage field="partyId" />
            </Form.Field>
          </Form.Field>

          <Form.Field>
            <Form.Label>Diretório</Form.Label>
            <Form.Field>
              <Form.SelectInput
                onChange={(e) => setSelectedDirectory(e.target.value)}
                value={selectedDirectory}
                type="text"
                placeholder="Selecione o diretório"
                name="directoryId"
              >
                {directory.map((directory, index) => {
                  return (
                    <option key={index} value={directory.id}>
                      {directory.typeOrg} {directory.city}
                    </option>
                  )
                })}
              </Form.SelectInput>
              <Form.ErrorMessage field="directoryId" />
            </Form.Field>
          </Form.Field>

          <Form.Field>
            <Form.Label>Vigência</Form.Label>
            <Form.Field>
              <Form.SelectInput
                onChange={(e) => setSelectedVigency(e.target.value)}
                value={selectedVigency}
                type="text"
                placeholder="Selecione a vigência"
                name="vigencyId"
              >
                {vigency.map((vigency, index) => {
                  return (
                    <option key={index} value={vigency.id}>
                      {vigency.dateFirst} - {vigency.dateLast}
                    </option>
                  )
                })}
              </Form.SelectInput>
              <Form.ErrorMessage field="vigencyId" />
            </Form.Field>
          </Form.Field>

          {error && <span className="text-sm text-red-500">{error}</span>}

          <Form.Field>
            <Form.Label>Ano da emissão</Form.Label>
            <Form.TextInput
              type="number"
              placeholder={dayjs().year().toString()}
              name="year"
            />
            <Form.ErrorMessage field="year" />
          </Form.Field>
          <button
            type="submit"
            className="bg-primary text-white hover:bg-primary-hover "
          >
            {isSubmitting ? <Loading /> : 'Gerar'}
          </button>
        </form>
      </FormProvider>
    </div>
  )
}
