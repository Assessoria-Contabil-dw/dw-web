import { useNotify } from "@/components/Toast/toast";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export class AdminUserService {
  notify = useNotify();
  router = useRouter();

  public async getAll(data: {
    skip?: number;
    take?: number;
    name?: string;
    cpf?: string;
    role?: string;
  }) {
    const response = await api.get("/admin/users", {
      params: data,
    });
    return response.data;
  }

  public async getById(id: string) {
    const response = await api.get(`/admin/user/${id}`);
    return response.data;
  }

  public async createUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    cpf: string;
  }) {
    const response = await api.post(`/admin/user`, {
      params: data,
    });
    return response.data;
  }

  public async updateUser(
    id: string,
    data: {
      name?: string;
      email: string;
      role: string;
      cpf: string;
      disabled: string;
    }
  ) {
    return await api.put(`/admin/user/${id}`, {
      data,
    });
  }

  public async updatePassword(id: string, password?: string) {
    return await api.put(`/admin/user/password/${id}`, {
      password,
    });
  }

  public async deleteUser(id: string) {
    return await api.delete(`/admin/user/${id}`);
  }
}
