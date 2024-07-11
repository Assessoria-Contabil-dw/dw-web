import { api } from "@/lib/api";

export class ElectionService {
  public async getAll(
    skip: number,
    take?: number,

    leaderName?: string,
    year?: string,
    legendId?: string
  ) {
    const response = await api.get("/elections", {
      params: {
        skip,
        take,
        leaderName,
        year,
        legendId,
      },
    });

    return response.data;
  }

  static async getById(id: string) {
    const response = await api.get(`/elections/${id}`);

    return response.data;
  }

  static async create(
    leaderId: number,
    array: Array<{
      year: string;
      numPge: string;
      observation?: string;
      colorId?: string;
    }>
  ) {
    const response = await api.post(`/elections`, {
      leaderId,
      array,
    });

    return response.data;
  }

  static async update(
    id: string,
    year: string,
    numPge?: string,
    colorId?: string,
    observation?: string
  ) {
    const response = await api.put(`/elections/${id}`, {
      year,
      numPge,
      colorId,
      observation,
    });

    return response.data;
  }
}
