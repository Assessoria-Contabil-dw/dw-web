export interface Convenio {
  id: number;
  diretorio: number;
  convenio: string;
  banco: number;
  agencia: number;
  conta: number;
  dv: number;
  developer_application_key?: string;
  client_id?: string;
  client_secret?: string;
}

export interface ConvenioFormData {
  id?: number;
  diretorio: number;
  convenio?: number;
  banco?: number;
  agencia?: number;
  conta?: number;
  dv?: number;
  developer_application_key?: string;
  client_id?: string;
  client_secret?: string;
}

export interface ConvenioListResponse {
  results: Convenio[];
  pages: number;
  count: number;
  next: boolean;
}

export interface ConvenioFilter {
  search?: string;
  convenio?: string;
  itensPorPagina?: number;
  paginaAtual?: number;
}
