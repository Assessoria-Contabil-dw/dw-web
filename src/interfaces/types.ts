export type NavigationItem = {
  name: string
  href: string
}

export interface LinkSitesProps {
  url: string
  logoUrl: string
}
export interface PartyProps {
  code: number

  name: string
  abbreviation: string
  logoUrl: string

  hex: string
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
  hasCertificate: boolean
  _vigencyCountVeciment: number
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
export interface SPCUpdateProps {
  year: string
  numPge?: string
  colorId?: string
  observation?: string
}
