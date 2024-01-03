import { api } from '@/lib/api'

export class TemplateService {
  public async getAll() {
    try {
      const response = await api.get('/templates')
      return response.data
    } catch (error) {
      return error
    }
  }

  public async getVigency(
    id?: string,
    content?: string,
    local?: string,
    date?: string,
  ) {
    try {
      const response = await api.get(`/template/vigency/${String(id)}`, {
        params: {
          content,
          local,
          date,
        },
      })
      return response.data
    } catch (error) {
      return error
    }
  }
}
