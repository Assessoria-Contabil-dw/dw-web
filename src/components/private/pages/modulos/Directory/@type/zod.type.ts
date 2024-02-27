import { z } from "zod";


export const directoryShema = z.object({
  typeOrgId: z
    .string()
    .min(1,'O tipo de organização não pode ser vazio'),
  partyCode: z.string().min(1,'O partido não pode ser vazio'),
  cityCode: z
    .string()
    .min(1,'O código da cidade não pode ser vazio'),
  address: z.string().optional(),
  cnpj: z
    .string()
    .min(1,'O CNPJ não pode ser vazio'),
  phone: z.string().optional(),
  siteUrl: z.string().optional(),
  email: z.string().optional(),
  mailingAddress: z.string().optional(),
  vigencyStatus: z.string().min(1, "Informe o status"),
  stateId: z.string().optional(),
})

export type directoryCreateType = z.infer<typeof directoryShema>;
