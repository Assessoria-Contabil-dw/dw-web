import { z } from "zod";

export const spcFilterSchema = z.object({
  partyAbbreviation: z.string().optional(),
  stateName: z.string().optional(),
  cityName: z.string().optional(),
  year: z.string().optional(),
  legendId: z.string().optional(),
  vigencyStatus: z.string().optional(),
});

export type spcFilterType = z.infer<typeof spcFilterSchema>;

export const spcUpdateSchema = z.object({
  id: z.string().min(1, "Registro não informado"),
  year: z.string().min(4, "Ano não informado"),
  numPge: z.string().optional(),
  colorId: z.string().optional(),
  observation: z.string().optional(),
});

export type spcUpdateType = z.infer<typeof spcUpdateSchema>;

export const spcCreateSchema = z.object({
  directoryId: z.string().min(1, "Diretório não informado"),
  spcArray: z.array(
    z.object({
      type: z.string().min(1, "Tipo não informado"),
      numPge: z.string().optional(),
      year: z.string().min(4, "Não informado"),
      colorId: z.string().optional(),
      observation: z.string().optional(),
    })
  ).min(1, "Nenhum registro informado"),
});

export type spcCreateType = z.infer<typeof spcCreateSchema>;
