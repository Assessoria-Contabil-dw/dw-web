import { useNotify } from "@/components/Toast/toast";
import { SPCCreateData } from "@/hooks/SPC/@type";
import { api } from "@/lib/api";
import { queryClient } from "@/provider/query.provider";
import { useRouter } from "next/navigation";

export class SPCService {
  notify = useNotify();
  router = useRouter();

  public async getAll(
    skip?: number,
    take?: number,
    partyCode?: string,
    stateId?: string,
    cityCode?: string,

    partyAbbreviation?: string,
    stateName?: string,
    cityName?: string,
    year?: string,
    legendId?: string,
    vigencyStatus?: string
  ) {
    try {
      const response = await api.get("/spcs", {
        params: {
          skip,
          take,
          partyCode,
          stateId,
          cityCode,
          partyAbbreviation,
          stateName,
          cityName,
          year,
          legendId,
          vigencyStatus,
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response.status === 403) {
        this.notify({ type: "warning", message: error.response.data.message });
       return this.router.push("/");
      }
      return this.notify({ type: "warning", message: error.response.data.message });
    }
  }

  public async getDirectoryById(
    id: string,
    partyCode?: string,
    stateId?: string,
    cityCode?: string,
  ) {
    try {
      const response = await api.get(`/spcs/directory/${id}`, {
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
       return this.router.push("/");
      }
      return this.notify({ type: "warning", message: error.response.data.message });
    }
  }

  public async getById(id: string) {
    try {
      const response = await api.get(`/spc/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }

  public async putOne(
    id: string,
    year: string,
    numPge?: string,
    colorId?: string,
    observation?: string 
  ) {
    try {
      const response = await api.put(`/spc/${id}`, {
          year,
          numPge,
          colorId,
          observation,
      });

      this.notify({ type: "success", message: response.data.message});
      queryClient.invalidateQueries('spcData')
      queryClient.invalidateQueries('spcDirectoryById')
      return response;
    } catch (error: any) {
      if (error.response.status === 404 || error.response.status === 400) {
        return this.notify({ type: "warning", message: error.response.data.message });
      }
      return this.notify({
        type: "error",
        message: error.response.data.message,
      });
    }
  }

  public async postAll(directoryId: string, spcArray: SPCCreateData[]) {
    try {
      const response = await api.post("/spcs", {
        directoryId,
        spcArray,
      });
      this.notify({ type: "success", message: response.data.message });
      queryClient.invalidateQueries('spcData')
      queryClient.invalidateQueries('spcDirectoryById')
      return response;
    } catch (error: any) {
      if (error.response.status === 404 || error.response.status === 400) {
        return this.notify({ type: "warning", message: error.response.data.message });
      }
      
      return this.notify({
        type: "error",
        message: error.response.data.message,
      });
    }
  }
}
