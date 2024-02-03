export type typeSPC = {
  type: "SPCE" | "SPCA";
};

export interface SPCEProps {
  id: number
  directoryId: string
  status: string
  surname: string

  type: typeSPC
  numPge: string
  year: string
  link: string
  color: string
  observation: string
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
  color: string
  observation: string
}


export interface SPCAllProps {
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

export interface SPCDirectoryProps {
  id: number;
  typeOrg: string;
  city: string;
  state: string;
  party: string;
  vigency: string;
  surname: string;
  SPCA:
    | {
        id: number;
        numPge: string;
        year: string;
        colorId: number;
        observation: string;
        colorHex: string;
        colorName: string;
      }[]
    | null;
  SPCE:
    | {
        id: number;
        numPge: string;
        year: string;
        colorId: number;
        observation: string;
        colorHex: string;
        colorName: string;
      }[]
    | null;
}


export interface SPCCreateData{
  type: string;
  colorId?: string;
  numPge?: string;
  year: string;
  observation?: string;
}