import { CityProps, PartyProps, StateProps, TypeOrgProps } from "@/interfaces/types";

export interface DirectoryCreateProps {
  id: number;
  cnpj: string;
  address?: string;
  siteUrl?: string;
  email?: string;
  phone?: string;
  mailingAddress?: string;
  virgencyStatus: string;
  vigencyStatus: string;

  typeOrgId: string;
  partyCode: number;
  cityCode: number;
}

export interface DirectoryByIdProps {
  id: number
  address: string
  cnpj: string
  siteUrl: string
  email: string
  phone: string
  mailingAddress: string
  surname: string
  vigencyStatus: string
  city: CityProps
  state: StateProps
  party: PartyProps

  typeOrg: TypeOrgProps
  partyId: number
  cityCode: number

  _vigencyVeciment: {
    id: number
    dateFirst: string
    dateLast: string
    daysVenciment: number
  }[],
  _count: {
    SPC: number
    vigencies: number
  }
}

export interface VigencyById {
  dateFirst: string;
  dateLast: string;
  daysVenciment: number;
  vigencyLeader: {
    leaderId: string;
    officeId: string;
  }[];
  vigencyAdvocate: {
    advocateId: string;
  }[];
  vigencyLawFirm: {
    lawFirmId: string;
  }[];
}
