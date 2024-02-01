import { useNotify } from '@/components/Toast/toast'
import { api } from '@/lib/api'

export class RelatoryService {
  notify = useNotify()

  public async getListDirectory(
    content: string,
    partyCode: string | undefined,
    stateId: string | undefined,
    cityCode: string | undefined,
    partyAbbreviation: string | undefined,
    stateName: string | undefined,
    cityName: string | undefined,
    typeOrgId: string | undefined,
    vigencyStatus: string | undefined,
    spcStatusId: string | undefined,
    spcYear: string | undefined,
    dateFirst: string | undefined,
    dateLast: string | undefined,
    isBefore: string | undefined,
    status: string | undefined
  ) {
    try {
      const response = await api.post(`/relatory/directory`, {
        content,
        partyCode,
        stateId,
        cityCode,
        partyAbbreviation,
        stateName,
        cityName,
        typeOrgId,
        vigencyStatus,
        spcStatusId,
        spcYear,
        dateFirst,
        dateLast,
        isBefore,
        status
      })

      return response.data
    } catch (error: any) {
      return this.notify({type: 'error', message: error.response.data.message})
    }
  }

}
