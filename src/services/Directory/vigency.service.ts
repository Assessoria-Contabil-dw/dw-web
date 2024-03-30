import { useNotify } from "@/components/Toast/toast";
import { api } from "@/lib/api";
import { queryClient } from "@/provider/query.provider";
import { useRouter } from "next/navigation";

export class VigencyService {
  notify = useNotify();
  router = useRouter();

  public async getById(vigencyId: string){
    try{
      const response = await api.get(`/vigency/create/${vigencyId}`)
      return response.data
    }catch(error: any){
      return this.notify({ type: "warning", message: error.response.data.message });
    }
  }

  public async getAllById(
    directoryId?: string,
    partyCode?: string,
    stateId?: string,
    cityCode?: string
  ) {
    try {
      const response = await api.get(`/vigencies/directory/${directoryId}`, {
        params: {
          partyCode,
          stateId,
          cityCode,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 403) {
        this.notify({ type: "warning", message: error.response.data.message });
        this.router.push("/");
      }
      return error;
    }
  }

  public async getVigencyById(
    id?: number,
    partyCode?: string,
    stateId?: string,
    cityCode?: string
  ) {
    try {
      const response = await api.get(`/vigency/${id}`, {
        params: {
          partyCode,
          stateId,
          cityCode,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 403) {
        this.notify({ type: "warning", message: error.response.data.message });
        this.router.push("/");
      }
      return error;
    }
  }

  public async getVenciment(){
      const response = await api.get('/vigencies/venciment')
      return response.data
  }

  public async create(
    dateFirst: string,
    dateLast: string,
    directoryId: string,
    vigencyLeader?: {
      officeId: number;
      leaderId: string;
    }[],
    vigencyAdvocate?: {
      advocateId: number;
    }[],
    vigencyLawFirm?: {
      lawFirmId: number;
    }[]
  ) {
    try {
      const response = await api.post(`/vigency`, {
        dateFirst,
        dateLast,
        directoryId,
        vigencyLeader,
        vigencyAdvocate,
        vigencyLawFirm,
      });
      this.notify({ type: 'success', message: 'Vigência cadastrada com sucesso' })
      queryClient.invalidateQueries('vigenciesData')
      return response.data;

    } catch (error: any) {
      if (error.response.status === 500) {
        console.error(error);
        this.notify({ type: "warning", message: "Erro interno no servidor" });
      }
      return this.notify({ type: "warning", message: error.response.data.message });

    }
  }

  public async update(
    vigencyId: string,
    directoryId: string,
    dateFirst: string,
    dateLast: string,
    vigencyLeader?: {
      officeId: string;
      leaderId: string;
    }[],
    vigencyAdvocate?: {
      advocateId: string;
    }[],
    vigencyLawFirm?: {
      lawFirmId: string;
    }[]
  ){
    try{
      const response = await api.put(`/vigency/${vigencyId}`, {
        directoryId,
        dateFirst,
        dateLast,
        vigencyLeader,
        vigencyAdvocate,
        vigencyLawFirm,
      })

      this.notify({ type: 'success', message: 'Vigência atualizada com sucesso' })
      queryClient.invalidateQueries('vigenciesData')
      queryClient.invalidateQueries('vigencyByIdUpdate')
      queryClient.invalidateQueries('vigencyUpdate')
      return response.data;
    }catch(error: any){
      if (error.response.status === 500) {
        console.error(error);
        this.notify({ type: "warning", message: "Erro interno no servidor" });
      }
      return this.notify({ type: "warning", message: error.response.data.message });
    }
  }
}
