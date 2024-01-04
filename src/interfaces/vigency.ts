import { AdvocateProps, LawFirmProps } from './types'

export interface Leader {
  id: number
  name: string
  signatureUrl: string
}

export interface Vigency {
  id: number
  dateFirst: string
  dateLast: string
  status: boolean
  president: Leader
  vicePresident: Leader
  treasurer: Leader
  advocate: Leader
  lawFirm: LawFirmProps
}

export interface VigencyDirectoryProps {
  directoryId: string
  status: boolean
  surname: string
  vigencyActive: Vigency[]
  vigencyInactive: Vigency[]
}

export interface VigencyProps {
  vigency: {
    vigencyId: number
    dateFirst: string
    dateLast: string
    directory: {
      address: string
      cnpj: string
      email: string
      phone: string
      vigencyStatus: boolean
      city: string
      uf: string
      surname: string
    }
    party: {
      code: number
      name: string
      abbreviation: string
      logoUrl: string
      colorCode: string
    }
  }

  president: {
    id: number

    office: string
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
  vicePresident: {
    id: number

    office: string
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
  treasurer: {
    id: number

    office: string
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

  advocates: AdvocateProps[]
  lawFirm: LawFirmProps[]
}
