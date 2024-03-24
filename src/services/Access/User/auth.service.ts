import { api } from "@/lib/api";

export class UserAuthService {
  public async postLogin(data: { cpf: string; password: string }) {
    return await api.post("/login", {
      data,
    });
  }

  public async postLogout() {
    return await api.post("/logout");
  }
}
