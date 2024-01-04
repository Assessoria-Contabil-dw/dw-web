import { api } from '@/lib/api'

export class AccessService {
  public async getAll() {
    try {
      const response = await api.get('/access')
      return response.data
    } catch (error) {
      return error
    }
  }

  public async getModulesById(
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

  public async getUserById(id: string) {
    try {
      const response = await api.get(`/access/user/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }
}
