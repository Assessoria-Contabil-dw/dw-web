import { api } from "@/lib/api";

export class AdvocatesService {
  static async getAll(data: {
    skip?: number;
    take?: number;
    name?: string;
    cpf?: string;
  }) {
    const response = await api.get("/advocates", { params: data });
    return response.data;
  }

  static async getById(id: string) {
    const response = await api.get(`/advocate/${id}`);
    return response.data;
  }

  static async create(data: {
    name: string;
    cpf: string;
    email?: string;
    phone?: string;
    oab?: string;
    birthday?: string;
    address?: string;
    file?: FileList;
    signatureUrl?: string;
    title?: string;
    lawFirmId?: string;
    status?: string;
  }) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cpf", data.cpf);
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("oab", data.oab || "");
    formData.append("birthday", data.birthday || "");
    formData.append("address", data.address || "");
    formData.append("title", data.title || "");
    formData.append("lawFirmId", data.lawFirmId || "");
    formData.append("status", data.status || "");
    formData.append("signatureUrl", data.signatureUrl || "");
    if (data.file) {
      formData.append("file", data.file[0]);
    }
    const response = await api.post("/advocates", formData);
    return response.data;
  }

  static async update(
    id: string,
    data: {
      name: string;
      cpf: string;
      email?: string;
      phone?: string;
      oab?: string;
      birthday?: string;
      address?: string;
      file?: FileList;
      signatureUrl?: string;
      title?: string;
      lawFirmId?: string;
      status?: string;
    }
  ) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cpf", data.cpf);
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("oab", data.oab || "");
    formData.append("birthday", data.birthday || "");
    formData.append("address", data.address || "");
    formData.append("title", data.title || "");
    formData.append("lawFirmId", data.lawFirmId || "");
    formData.append("status", data.status || "");
    formData.append("signatureUrl", data.signatureUrl || "");
    if (data.file) {
      formData.append("file", data.file[0]);
    }

    const response = await api.put(`/advocate/${id}`, formData);
    return response.data;
  }

  static async delete(id: string) {
    const response = await api.delete(`/advocate/${id}`);
    return response.data;
  }
}
