import { useNotify } from "@/components/Toast/toast";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export class UserService {
  notify = useNotify();
  router = useRouter();

  public async get() {
    const response = await api.get("/user");
    return response.data;
  }

  public async put(data: { name?: string; email?: string }) {
    return await api.put(`/user`, {
     data
    });
  }

  public async putPassword(password?: string) {
    return await api.put(`/user/password`, {
      password,
    });
  }
}
