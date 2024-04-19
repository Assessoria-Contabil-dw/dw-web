import { useNotify } from "@/components/Toast/toast";
import { api } from "@/lib/api";
import { queryClient } from "@/provider/query.provider";
import { useRouter } from "next/navigation";

export class DirectoryService {
  notify = useNotify();
  router = useRouter();

  public async getAll(params:{
    skip?: number,
    take?: number,
    partyAbbreviation?: string,
    stateName?: string,
    cityName?: string,
    typeOrgId?: number,
    vigencyStatus?: string,
    partyCode?: string,
    stateId?: string,
    cityCode?: string
  }) {
    try {
      const response = await api.get("/directories", {
        params: params,
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 403) {
        this.notify({ type: "warning", message: error.response.data.message });
        return this.router.push("/");
      }
      return this.notify({
        type: "error",
        message: "Não foi possível carregar as informações",
      });
    }
  }

  static async getById(
    directoryId: string,
    partyCode?: string,
    stateId?: string,
    cityCode?: string
  ) {
      const response = await api.get(`/directory/${directoryId}`, {
        params: {
          partyCode,
          stateId,
          cityCode,
        },
      });
      return response.data;
  }

  public async getByFilter(
    partyAbbreviation?: string,
    stateSigla?: string,
    cityName?: string,
    partyCode?: string,
    stateId?: string,
    cityCode?: string
  ) {
    try {
      const response = await api.get(`/directories/filter`, {
        params: {
          partyAbbreviation,
          stateSigla,
          cityName,
          partyCode,
          stateId,
          cityCode,
        },
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async createDirectory(
    cnpj: string,
    partyCode: string,
    cityCode: string,
    typeOrgId: string,
    vigencyStatus: string,
    address?: string,
    siteUrl?: string,
    email?: string,
    phone?: string,
    mailingAddress?: string
  ) {
    try {
      const response = await api.post("/directory", {
        cnpj,
        partyCode,
        cityCode,
        typeOrgId,
        vigencyStatus,
        address,
        siteUrl,
        email,
        phone,
        mailingAddress,
      });
      this.notify({ type: "success", message: "Diretório criado com sucesso" });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 500) {
        console.log(error);
        queryClient.invalidateQueries("directoryData");
        return this.notify({ type: "warning", message: "Erro interno" });
      }
      return this.notify({
        type: "error",
        message: error.response.data.message,
      });
    }
  }

  static async update(id: string, data: {
    cnpj: string,
    partyCode: string,
    cityCode: string,
    typeOrgId: string,
    vigencyStatus: string,
    address?: string,
    siteUrl?: string,
    email?: string,
    phone?: string,
    mailingAddress?: string
  }) {
    try {
      const response = await api.put(`/directory/${id}`, data);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async deleteById(id: string) {
    try {
      const response = await api.delete(`/directories/${id}`);
      this.notify({
        type: "success",
        message: "Diretório deletado com sucesso",
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
