import { api } from '@/lib/api'

export class DirectoryService {
  public async getAll(
    skip?: number,
    take?: number,
    party?: string,
    state?: string,
    city?: string,
    status?: string,
    partyCode?: string,
    cityCode?: string,
    stateId?: string,
  ) {
    try {
      const response = await api.get('/directories', {
        params: {
          skip,
          take,
          party,
          state,
          city,
          status,
          partyCode,
          stateId,
          cityCode,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  public async deleteById(id: string) {
    try {
      const response = await api.delete(`/directories/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }
}
