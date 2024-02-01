import { useNotify } from "@/components/Toast/toast";
import { api } from "@/lib/api";

export class DocumentService {
  notify = useNotify();

  public async post(
    vigencies: any[],
    content?: string,
    date?: string,
    partyCode?: string,
    stateId?: string,
    cityCode?: string,
    variables?: any[],
    officeId?: string,
  ) {
    console.log(vigencies);
    try {
      const response = await api.post(`/document/vigency`, {
        vigencies,
        content,
        date,
        partyCode,
        stateId,
        cityCode,
        variables,
        officeId,
      });
      return response.data;
    } catch (error) {
      return error;
    }
  }
}
