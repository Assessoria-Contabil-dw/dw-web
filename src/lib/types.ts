export interface PartyProps {
  code: string

  name: string
  abbreviation: string
  logoUrl: string

  color: string
  colorId: string
}

export interface ColorProps {
  id: string

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
  id: string

  cnpj: string
  address: string
  siteUrl: string
  email: string
  phone: string
  mailingAddress: string
  virgencyStatus: string

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
  id: string

  name: string
  abbreviation: string
}

export interface VigencyAdvocateProps {
  id: string

  vigencyId: string
  advocateId: string
}

export interface VigencyLawFirmProps {
  id: string

  vigencyId: string
  lawFirmId: string
}

export interface VigencyLeadersProps {
  id: string

  vigencyId: string
  leaderId: string
  officeId: string
}

export interface VigencyProps {
  id: string

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
  id: string

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
  id: string

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
  id: string

  name: string
  cnpj: string
  email: string
  phone: string
  address: string

  advocates: AdvocateProps[]
}

export interface OfficesProps {
  id: string

  name: string
}

export type typeSPC = {
  type: 'SPCE' | 'SPCA'
}

export interface SPCProps {
  id: string
  directoryId: string
  status: string

  type: typeSPC
  numPge: string
  year: string
  link: string
  colorId: string

  observation: string
  directory: DirectoryProps
  color: ColorProps
}

export interface DirectorySPCProps {
  id: string
  city: string
  state: string
  typeOrg: string
  party: string
  vigency: string
  SPCA: SPCProps[]
  SPCE: SPCProps[]
}
