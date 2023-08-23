import { z } from 'zod'
// const MAX_FILE_SIZE = 5 * 1024 * 1024
// const ACCEPTED_IMAGE_TYPES = [
//   'image/jpeg',
//   'image/jpg',
//   'image/png',
//   'image/webp',
// ]
// Party
export const partyFormShema = z.object({
  code: z.coerce
    .number()
    .positive('O código deve ser um número positivo')
    .min(1, 'O código deve ser maior que 0'),
  name: z
    .string()
    .min(3, 'O nome do partido deve ter no mínimo tres letras')
    .max(255, 'O nome do partido deve ter no máximo 255 letras')
    .nonempty('O nome do partido não pode ser vazio'),
  abbreviation: z
    .string()
    .min(2, 'A sigla do partido deve ter no mínimo duas letras')
    .max(25, 'A sigla do partido deve ter no máximo 25 letras')
    .nonempty('A sigla do partido não pode ser vazio'),
  logoUrl: z
    .instanceof(FileList)
    .transform((file) => file[0])
    .optional(),
  colorId: z.coerce
    .number()
    .positive('A cor do partido deve não deve ser vazia')
    .min(1, 'A cor do partido não deve ser vazia'),
  color: z.string().optional(),
})
// Color
export const colorFormShema = z.object({
  id: z.coerce.number().min(1),
  name: z.string().min(3).max(25),
  hex: z.string().min(3).max(8),
  type: z.enum(['LEGEND', 'BACKGROUND']).default('BACKGROUND'),
})

// State
export const stateFormShema = z.object({
  uf: z.string().min(2).max(3).nonempty(),
  code: z.coerce.number().min(1),
  name: z.string().min(3).max(255).nonempty().toLowerCase(),
})

// City
export const cityFormShema = z.object({
  code: z.string().min(5).max(5),
  name: z.string().min(3).max(50),
  ibge7: z.coerce.number().optional(),
  ibge6: z.coerce.number().optional(),
  codeRf: z.coerce.number().optional(),
  stateId: z.string().min(2).max(3).nonempty(),
})

// virgencies
export const virgenciesFormSchema = z.object({
  dateFirst: z.coerce
    .date()
    .refine((data) => !!data, 'A data não pode ser vazia'),
  dateLast: z.coerce
    .date()
    .refine((data) => !!data, 'A data não pode ser vazia'),
  vigencyLeader: z
    .array(
      z.object({
        officeId: z.string().uuid().nonempty('O cargo não pode ser vazio'),
        leaderId: z.string().nonempty('O líder não pode ser vazio'),
      }),
    )
    .min(0),
  vigencyAdvocate: z
    .array(
      z.object({
        advocateId: z.string().uuid().nonempty('O advogado não pode ser vazio'),
      }),
    )
    .min(0),
  vigencyLawFirm: z
    .array(
      z.object({
        lawFirmId: z
          .string()
          .uuid()
          .nonempty('O escritório não pode ser vazio'),
      }),
    )
    .min(0),
})

// Directory
export const directoryFormShema = z.object({
  typeOrg: z
    .string()
    .uuid()
    .nonempty('O tipo de organização não pode ser vazio'),
  partyId: z.string().nonempty('O partido não pode ser vazio'),
  cityCode: z
    .string()
    .min(5, 'O código deve ter no minino 5 digitos')
    .max(5, 'O código deve ter no maximo 5 digitos')
    .nonempty('O código da cidade não pode ser vazio'),
  address: z.string().min(3, 'O endereço não pode ficar vazio').max(255),
  cnpj: z
    .string()
    .min(14, 'O cnpj deve ter no mínimo 14 dígitos')
    .max(14, 'O cnpj deve ter no máximo 14 dígitos')
    .nonempty('O CNPJ não pode ser vazio'),
  phone: z.optional(z.string()),
  siteUrl: z.optional(z.string()),
  email: z.optional(z.string()),
  mailingAddress: z.optional(z.string()),
  vigencyStatus: z.coerce.boolean().default(true).optional(),
})

// Directory Vigency
export const directoryVigencyFormShema = z.object({
  partyId: z.coerce.number().positive().min(0),
  address: z.string().min(3).max(255),
  cnpj: z.string().min(14).max(14).nonempty('O CNPJ não pode ser vazio'),
  siteUrl: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(11).optional(),
  mailingAddress: z.string().min(3).max(255).optional(),
  vigencyStatus: z.coerce.boolean().default(true),
  cityCode: z
    .string()
    .min(5, 'O código deve ter no minino 5 digitos')
    .max(5, 'O código deve ter no maximo 5 digitos')
    .nonempty('O código da cidade não pode ser vazio'),
  typeOrgId: z.coerce
    .number()
    .positive()
    .min(1, 'O tipo de organização não pode ser vazio'),
  virgencies: z.array(virgenciesFormSchema),
})

export const leaderFormShema = z.object({
  name: z
    .string()
    .min(3, 'O nome não pode ser vazio')
    .nonempty('O nome é obrigatório'),
  cpf: z
    .string()
    .min(11, 'O CPF deve ter 11 dígitos')
    .max(11, 'O CPF deve ter 11 dígitos')
    .nonempty('O CPF não pode ser vazio'),
  rg: z.string().optional(),
  title: z.string().optional(),
  birthday: z.coerce.date().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  img: z
    .instanceof(FileList)
    .transform((file) => file[0])
    .optional(),
  nationality: z.enum(['BRASILEIRO', 'ESTRANGEIRO']).default('BRASILEIRO'),
  status: z
    .enum(['CASADO', 'DIVORCIADO', 'SOLTEIRO', 'VIUVO'])
    .default('SOLTEIRO'),
  profession: z.string().optional(),
})

export const advocateFormShema = z.object({
  name: z
    .string()
    .min(3, 'O nome não pode ser vazio')
    .nonempty('O nome não pode ser vazio'),
  cpf: z
    .string()
    .min(11, 'O CPF deve ter 11 dígitos')
    .max(11, 'O CPF deve ter 11 dígitos')
    .nonempty('O CPF não pode ser vazio'),
  birthday: z.string().optional(),
  email: z.string().optional(),
  oab: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().min(3, 'Endereço não pode ser vazio').optional(),
  img: z
    .instanceof(FileList)
    .transform((file) => file[0])
    .optional(),
  title: z.string().optional(),
  status: z
    .enum(['CASADO', 'DIVORCIADO', 'SOLTEIRO', 'VIUVO'])
    .default('SOLTEIRO'),
  lawFirmId: z.string().optional(),
})

export const lawFirmFormShema = z.object({
  name: z.string().min(3, 'O nome não pode ser vazio').nonempty(),
  address: z.string().min(3, 'O endereço não pode ficar vazio').max(255),
  cnpj: z
    .string()
    .max(14, 'O cnpj deve ter no máximo 14 dígitos')
    .nonempty('O CNPJ não pode ser vazio'),
  phone: z.string().optional(),
  email: z.string().optional(),
})

export const spcFormShema = z.object({
  directoryId: z.coerce
    .number()
    .positive()
    .min(1, 'O diretório não pode ser vazio'),
  spc: z.array(
    z.object({
      type: z.enum(['SPCA', 'SPCE']),
      numPge: z.string().nonempty('O número do PGE não pode ser vazio'),
      year: z.string().nonempty('O ano não pode ser vazio'),
      status: z
        .string()
        .uuid('Selecione um status')
        .nonempty('O status não pode ser vazio'),
      observation: z.string(),
    }),
  ),
})
