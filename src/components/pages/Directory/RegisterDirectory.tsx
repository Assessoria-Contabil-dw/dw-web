'use client'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { api } from '@/lib/api'
import { Form } from '../../Form'
import { directoryFormShema } from '@/@types/validation'
import { CityProps, PartyProps, StateProps, TypeOrgProps } from '@/@types/types'
import Cookie from 'js-cookie'
import { LoadingSecond } from '@/components/Loading/second'

interface DirectoryProps {
  id: number

  cnpj: string
  address: string
  siteUrl: string
  email: string
  phone: string
  mailingAddress: string
  virgencyStatus: string
  surname: string
  mailingList: string
  vigencyStatus: string
  city: string
  state: string
  party: string

  typeOrg: string
  partyId: number
  cityCode: number
}

type DirectoryFormData = z.infer<typeof directoryFormShema>
interface RegisterDirectoryModalProps {
  isOpen: boolean
  onClose: () => void
  onCreate: (directory: DirectoryProps) => void
}

export function DirectoryForm({
  onClose,
  isOpen,
  onCreate,
}: RegisterDirectoryModalProps) {
  const createDirectoryForm = useForm<DirectoryFormData>({
    resolver: zodResolver(directoryFormShema),
  })

  const [error, setError] = useState<string | null>(null)
  const [parties, setParty] = useState<PartyProps[]>([])
  const [states, setState] = useState<StateProps[]>([])
  const [cities, setCity] = useState<CityProps[]>([])
  const [org, setTypeOrg] = useState<TypeOrgProps[]>([])
  const [selectedParty, setSelectedParty] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const [selectedOrg, setSelectedOrg] = useState('')

  useEffect(() => {
    Promise.all([api.get('/parties'), api.get('/states'), api.get('/typeOrg')])
      .then(([parties, states, typeOrg]) => {
        setParty(parties.data)
        setState(states.data)
        setTypeOrg(typeOrg.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [onClose])

  useEffect(() => {
    setSelectedCity('')
    if (selectedState) {
      api
        .get(`/cities/states/${selectedState}`)
        .then((response) => {
          setCity(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }, [selectedState])

  if (!isOpen) {
    return null
  }

  function handleCloseModal() {
    onClose()
  }

  async function handleDirectory(data: DirectoryFormData) {
    console.log(data)

    const token = Cookie.get('token')
    try {
      const response = await api.post(
        '/directories',
        [
          {
            typeOrgId: selectedOrg,
            partyId: Number(selectedParty),
            cityCode: selectedCity,
            address: data.address === '' ? undefined : data.address,
            cnpj: data.cnpj,
            phone: data.phone === '' ? undefined : data.phone,
            email: data.email === '' ? undefined : data.email,
            siteUrl: data.siteUrl === '' ? undefined : data.siteUrl,
            mailingAddress:
              data.mailingAddress === '' ? undefined : data.mailingAddress,
          },
        ],
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const directory = response.data as DirectoryProps
      // onCreate(directory)
      console.log(directory)

      setError('')
      console.log('Partido cadastrado com sucesso')
    } catch (error: any) {
      if (
        error.response.status === 422 ||
        error.response.status === 401 ||
        error.response.status === 400
      ) {
        setError(error.response.data.message)
      } else {
        console.log(error)
        setError('Error ao cadastrar')
      }
    }
  }

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = createDirectoryForm

  return (
    <div className="fixed right-0 top-0 flex h-screen w-screen items-center justify-center bg-black/50">
      <div className="h-3/4 w-2/4 overflow-hidden">
        <FormProvider {...createDirectoryForm}>
          <form
            onSubmit={handleSubmit(handleDirectory)}
            className="flex h-full w-full flex-col items-end  p-1 py-3"
          >
            <div className="flex h-full w-full overflow-y-auto p-8">
              <div className="flex h-full w-full flex-col justify-between gap-6">
                <div className="flex w-full items-start justify-between border-b-[1px]">
                  <div>
                    <h4>Cadastrar Diretório</h4>
                    <span>Cadastre um diretório</span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="w-fit rounded-full p-0 text-gray-300 hover:text-gray-600"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-4">
                  <Form.Field>
                    <Form.Label htmlFor="typeOrg">
                      Tipo de organização
                    </Form.Label>
                    <Form.SelectInput
                      type="text"
                      name="typeOrg"
                      value={selectedOrg}
                      onChange={(e) => setSelectedOrg(e.target.value)}
                      placeholder="Selecione o tipo"
                    >
                      {org.map((o, index) => {
                        return (
                          <option key={index} value={o.id}>
                            {o.name}
                          </option>
                        )
                      })}
                    </Form.SelectInput>
                    <Form.ErrorMessage field="typeOrg" />
                  </Form.Field>

                  {/* <Form.Field>
                    <Form.Label htmlFor="typeOrg">Vigencia</Form.Label>
                    <div className="flex gap-4">
                      <RadioInput
                        value="true"
                        type="radio"
                        label="Ativa"
                        checked
                        name="vigencyStatus"
                      />

                      <RadioInput
                        value="false"
                        type="radio"
                        label="Inativo"
                        name="vigencyStatus"
                      />
                    </div>
                    <Form.ErrorMessage field="vigencyStatus" />
                  </Form.Field> */}

                  <div className="flex gap-3 ">
                    <Form.Field>
                      <Form.Label htmlFor="partyId">Partido</Form.Label>
                      <Form.SelectInput
                        type="text"
                        name="partyId"
                        value={selectedParty}
                        onChange={(e) => setSelectedParty(e.target.value)}
                        placeholder="Selecione um partido"
                      >
                        {parties.map((party, index) => {
                          return (
                            <option key={index} value={party.code.toString()}>
                              {party.code} - {party.abbreviation}
                            </option>
                          )
                        })}
                      </Form.SelectInput>
                      <Form.ErrorMessage field="partyId" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label>Estado</Form.Label>
                      <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                      >
                        <option disabled value="">
                          Selecione um estado
                        </option>
                        {states.map((state) => {
                          return (
                            <option key={state.uf} value={state.uf}>
                              {state.uf}
                            </option>
                          )
                        })}
                      </select>
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="cityCode">Cidade</Form.Label>
                      <Form.SelectInput
                        type="text"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                        placeholder="Selecione uma cidade"
                        name="cityCode"
                        disabled={!selectedState}
                        className="disabled:bg-gray-100 disabled:text-gray-500"
                      >
                        {cities.map((city) => {
                          return (
                            <option key={city.code} value={city.code}>
                              {city.code} - {city.name}
                            </option>
                          )
                        })}
                      </Form.SelectInput>
                      <Form.ErrorMessage field="cityCode" />
                    </Form.Field>
                  </div>

                  <div className="flex gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="cnpj">CNPJ</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o CNPJ"
                        name="cnpj"
                      />
                      <Form.ErrorMessage field="cnpj" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="mailingAddress">
                        Endereço de Correspondência
                      </Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o endereço de correspondência"
                        name="mailingAddress"
                      />
                      <Form.ErrorMessage field="mailingAddress" />
                    </Form.Field>
                  </div>

                  <div className="flex gap-3">
                    <Form.Field>
                      <Form.Label htmlFor="phone">Telefone</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o telefone"
                        name="phone"
                      />
                      <Form.ErrorMessage field="phone" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="email">E-mail</Form.Label>
                      <Form.TextInput
                        type="email"
                        placeholder="Digite o e-mail"
                        name="email"
                      />
                      <Form.ErrorMessage field="email" />
                    </Form.Field>

                    <Form.Field>
                      <Form.Label htmlFor="siteUrl">Site URL</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Digite o link do site"
                        name="siteUrl"
                      />
                      <Form.ErrorMessage field="siteUrl" />
                    </Form.Field>
                  </div>

                  <div>
                    <Form.Field>
                      <Form.Label htmlFor="address">Endereço</Form.Label>
                      <Form.TextInput
                        type="text"
                        placeholder="Rua, n°, Bairro, Cidade - UF, CEP"
                        name="address"
                      />
                      <Form.ErrorMessage field="address" />
                    </Form.Field>
                  </div>
                </div>

                {error && <span className="text-red-500">{error}</span>}
                <div className="flex gap-4">
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-200 text-gray-500 hover:bg-gray-300 "
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary text-white hover:bg-green-600 disabled:bg-primary disabled:text-white"
                  >
                    {isSubmitting ? <LoadingSecond /> : `Cadastrar`}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
