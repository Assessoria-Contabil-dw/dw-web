import { LawFirmProps } from './types'

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
