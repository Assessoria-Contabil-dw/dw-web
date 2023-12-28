export type NavigationItem = {
  name: string
  href: string
}

export interface PartyProps {
  code: string

  name: string
  abbreviation: string
  logoUrl: string

  color: string
  colorId: string
}

export interface ColorProps {
  id: number

  name: string
  hex: string
  type: string
}

export interface StateProps {
  uf: string

  code: number
  name: string
}

export interface CityProps {
  code: string

  name: string
  ibge7: number
  ibge6: number
  codeRf: number

  stateId: string
}

export interface DirectoryProps {
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

export interface TypeOrgProps {
  id: number

  name: string
  abbreviation: string
}

export interface VigencyAdvocateProps {
  id: number

  vigencyId: number
  advocateId: number
}

export interface VigencyLawFirmProps {
  id: number

  vigencyId: string
  lawFirmId: string
}

export interface VigencyLeadersProps {
  id: number

  vigencyId: number
  leaderId: number
  officeId: number
}

export interface VigencyProps {
  id: number

  dateFirst: string
  dateLast: string
  status: boolean
  directoryId: string

  party: number
  city: string
  state: string
  typeOrg: string

  vigencyLeader: VigencyLeadersProps[]
  vigencyAdvocate: VigencyAdvocateProps[]
  vigencyLawFirm: VigencyLawFirmProps[]
}

export interface LeaderProps {
  id: number

  name: string
  cpf: string
  birthday: string
  rg: string
  email: string
  phone: string
  address: string
  title: string
  nationality: string
  status: string
  profession: string
  signatureUrl: string
}

export interface AdvocateProps {
  id: number

  name: string
  oab: string
  birthday: string
  title: string
  cpf: string
  email: string
  phone: string
  address: string
  nationality: string
  status: string
  signatureUrl: string

  lawFirmName: string
  lawFirmId: string
}

export interface LawFirmProps {
  id: number

  name: string
  cnpj: string
  email: string
  phone: string
  address: string

  advocates: AdvocateProps[]
}

export interface OfficesProps {
  id: number

  name: string
}

export type typeSPC = {
  type: 'SPCE' | 'SPCA'
}

export interface SPCEProps {
  id: number
  directoryId: string
  status: string
  surname: string

  type: typeSPC
  numPge: string
  year: string
  link: string
  colorId: string

  observation: string
  directory: DirectoryProps
  color: ColorProps
}

export interface SPCAProps {
  id: number
  directoryId: string
  status: string
  surname: string

  type: typeSPC
  numPge: string
  year: string
  link1: string
  link2: string
  colorId: string

  observation: string
  directory: DirectoryProps
  color: ColorProps
}

export interface DirectorySPCProps {
  id: number
  city: string
  state: string
  typeOrg: string
  party: string
  vigency: string
  surname: string
  SPCA: SPCAProps[] | null
  SPCE: SPCEProps[] | null
}


