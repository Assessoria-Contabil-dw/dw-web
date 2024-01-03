import { api } from '@/lib/api'

export class SPCService {
  public async getAll(
    skip?: number,
    take?: number,
    party?: string,
    state?: string,
    city?: string,
    status?: string,
    year?: string,
    legend?: string,
    partyCode?: string,
    stateCode?: string,
    cityCode?: string,
  ) {
    try {
      const response = await api.get('/spcs', {
        params: {
          skip,
          take,
          party,
          state,
          city,
          status,
          year,
          legend,
          partyCode,
          stateCode,
          cityCode,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }

  public async getOne(id: string) {
    try {
      const response = await api.get(`/spcs/directory/${id}`)
      return response.data
    } catch (error) {
      return error
    }
  }

  public async putOne(
    id: string,
    year: string,
    numPge: string,
    status: number,
    observation: string,
  ) {
    try {
      const response = api.put(`/spcs/${id}`, {
        params: {
          year,
          numPge,
          status,
          observation,
        },
      })
      return response
    } catch (err) {
      return err
    }
  }
}
