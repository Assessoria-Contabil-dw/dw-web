import { z } from "zod";

export const vigencyUpdateSchema =  z.object({
  dateFirst: z.string().min(1, 'A data não pode ser vazia'),
  dateLast: z.string().min(1, 'A data não pode ser vazia'),
  vigencyLeader: z
    .array(
      z.object({
        officeId: z.string().min(1, 'O cargo não pode ser vazio'),
        leaderId: z.string().min(1,'O líder não pode ser vazio'),
      }),
    )
    .optional(),
  vigencyAdvocate: z
    .array(
      z.object({
        advocateId: z.string().min(1, 'O advogado não pode ser vazio'),
      }),
    )
    .optional(),
  vigencyLawFirm: z
    .array(
      z.object({
        lawFirmId: z.string().min(1, 'O escritório não pode ser vazio'),
      }),
    )
    .optional(),
});


export type vigencyUpdateType = z.infer<typeof vigencyUpdateSchema>;

