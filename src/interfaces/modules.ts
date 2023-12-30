export interface Modules {
  acessId: number
  module: string
  moduleId: number
  path: string
}

export interface CityData {
  id: number
  cityCode: string
  partyCode: number
  party: string
  city: string
  state: string
  modules: Modules[]
}

export interface PartyData {
  id: number
  partyCode: number
  party: string
  modules: Modules[]
}
export interface StateData {
  id: number
  stateId: string
  partyCode: number
  party: string
  state: string
  modules: Modules[]
}

export interface AccessProps {
  acessParty: PartyData[] | null
  acessCity: CityData[] | null
  acessState: StateData[] | null
  acessDistrict: CityData[] | null
}

export interface AccessModuleData {
  acessName: string | null
  modules: Modules[]
}
