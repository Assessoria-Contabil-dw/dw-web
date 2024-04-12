import { api } from "@/lib/api";

export class UserAuthService {
  static async postLogin(data: { cpf: string; password: string }) {
    const res = await api.post("/login", data);
    const NAME_TOKEN = process.env.NEXT_PUBLIC_TOKEN_NAME as string;
    localStorage.setItem(NAME_TOKEN, res.data.token);
  }

  static async postLogout() {
    const NAME_TOKEN = process.env.NEXT_PUBLIC_TOKEN_NAME as string;
    localStorage.removeItem(NAME_TOKEN);
  }
}
