import { api } from '@/lib/api'

export class DirectoryService {
  public async getAll(
    skip?: number,
    take?: number,
    party?: string,
    city?: string,
    state?: string,
    vigencyStatus?: string,
    partyCode?: number,
    cityCode?: string,
    stateId?: string,
  ) {
    try {
      const response = await api.get('/directories', {
        params: {
          skip,
          take,
          party,
          city,
          state,
          vigencyStatus,
          partyCode: partyCode === 0 ? undefined : partyCode,
          cityCode,
          stateId,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}
