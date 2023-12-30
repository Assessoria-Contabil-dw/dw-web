import { api } from '@/lib/api'

export class AccessService {
  public async getAccessAll() {
    try {
      const response = await api.get('/access')
      return response.data
    } catch (error) {
      return error
    }
  }

  public async getAccessModules(
    partyCode?: string,
    stateId?: string,
    cityCode?: string,
  ) {
    try {
      const response = await api.get('/access/modules', {
        params: {
          partyCode: partyCode ? Number(partyCode) : undefined,
          stateId,
          cityCode,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}
