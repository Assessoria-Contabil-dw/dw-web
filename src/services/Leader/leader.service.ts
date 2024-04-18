import { api } from "@/lib/api";

export class LeadersService {
  static async getAll(data: {
    skip?: number;
    take?: number;
    name?: string;
    cpf?: string;
  }) {
    const response = await api.get("/leaderies", { params: data });
    return response.data;
  }

  static async getById(id: string) {
    const response = await api.get(`/leader/${id}`);
    return response.data;
  }

  static async create(data: {
    name: string;
    cpf: string;
    email?: string;
    phone?: string;
    rg?: string;
    birthday?: string;
    address?: string;
    file?: FileList;
    signatureUrl?: string;
    title?: string;
    lawFirmId?: string;
    status?: string;
    profession?: string;
    importantPasswords?: { password: string; name: string }[];
  }) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cpf", data.cpf);
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("rg", data.rg || "");
    formData.append("birthday", data.birthday || "");
    formData.append("address", data.address || "");
    formData.append("title", data.title || "");
    formData.append("lawFirmId", data.lawFirmId || "");
    formData.append("status", data.status || "");
    formData.append("signatureUrl", data.signatureUrl || "");
    formData.append("profession", data.profession || "");
    
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    if (data.importantPasswords) {
      const importantPasswordsData = data.importantPasswords.map((item) => ({
        name: item.name,
        passwordHash: item.password,
      }));

      formData.append(
        "importantPasswords",
        JSON.stringify(importantPasswordsData.map((item) => item))
      );
    }
    const response = await api.post("/leader", formData);
    console.log(response.data);
    return response.data;
  }

  static async update(
    id: string,
    data: {
      name: string;
      cpf: string;
      email?: string;
      phone?: string;
      rg?: string;
      birthday?: string;
      address?: string;
      file?: FileList;
      signatureUrl?: string;
      title?: string;
      lawFirmId?: string;
      status?: string;
      profession?: string;
      importantPasswords?: { password: string; name: string }[];
    }
  ) {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("cpf", data.cpf);
    formData.append("email", data.email || "");
    formData.append("phone", data.phone || "");
    formData.append("rg", data.rg || "");
    formData.append("birthday", data.birthday || "");
    formData.append("address", data.address || "");
    formData.append("title", data.title || "");
    formData.append("lawFirmId", data.lawFirmId || "");
    formData.append("status", data.status || "");
    formData.append("signatureUrl", data.signatureUrl || "");
    formData.append("profession", data.profession || "");
    
    if (data.file && data.file.length > 0) {
      formData.append("file", data.file[0]);
    }

    if (data.importantPasswords) {
      const importantPasswordsData = data.importantPasswords.map((item) => ({
        name: item.name,
        passwordHash: item.password,
      }));

      formData.append(
        "importantPasswords",
        JSON.stringify(importantPasswordsData.map((item) => item))
      );
    }
    const response = await api.put(`/leader/${id}`, formData);
    return response.data;
  }

  static async delete(id: string) {
    const response = await api.delete(`/leader/${id}`);
    return response.data;
  }
}
