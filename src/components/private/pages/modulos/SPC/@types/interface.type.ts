export interface spcFilterTableProps {
  partyAbbreviation?: string;
  stateName?: string;
  cityName?: string;
  year?: string;
  legendId?: string;
  vigencyStatus?: string;
}

export interface spcUpdateProps {
  id: number;
  year: string;
  numPge?: string;
  colorId?: number;
  observation?: string;
  onClick: (id: string) => void;
}

export interface SPCOneData {
  id: number
  year: string
  numPge: string
  colorId: number
  colorHex: string
  colorName: string
  observation: string
}

