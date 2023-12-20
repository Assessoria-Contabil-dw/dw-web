import { api } from '@/lib/api'

export class DirectoryService {
  public async getAll(
    skip: number | undefined,
    take: number | undefined,
    party: string | undefined,
    city: string | undefined,
    state: string | undefined,
    vigencyStatus: string | undefined,
    partyCode: number | undefined,
    cityCode: string | undefined,
    stateId: string | undefined,
  ) {
    const response = await api
      .get('/directories', {
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
      .then((response) => response.data)
    return response
  }
}
