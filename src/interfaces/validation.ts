import dayjs from 'dayjs'
import { z } from 'zod'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

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
    .min(1,'O nome do partido não pode ser vazio'),
  abbreviation: z
    .string()
    .min(2, 'A sigla do partido deve ter no mínimo duas letras')
    .max(25, 'A sigla do partido deve ter no máximo 25 letras')
    .min(1,'A sigla do partido não pode ser vazio'),
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
  uf: z.string().min(2).max(3).min(1,),
  code: z.coerce.number().min(1),
  name: z.string().min(3).max(255).min(1,).toLowerCase(),
})

// City
export const cityFormShema = z.object({
  code: z.string().min(5).max(5),
  name: z.string().min(3).max(50),
  ibge7: z.coerce.number().optional(),
  ibge6: z.coerce.number().optional(),
  codeRf: z.coerce.number().optional(),
  stateId: z.string().min(2).max(3).min(1,),
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
        officeId: z.coerce.number().min(1, 'O cargo não pode ser vazio'),
        leaderId: z.string().min(1,'O líder não pode ser vazio'),
      }),
    )
    .optional(),
  vigencyAdvocate: z
    .array(
      z.object({
        advocateId: z.coerce.number().min(1, 'O advogado não pode ser vazio'),
      }),
    )
    .optional(),
  vigencyLawFirm: z
    .array(
      z.object({
        lawFirmId: z.coerce.number().min(1, 'O escritório não pode ser vazio'),
      }),
    )
    .optional(),
})

// Directory
export const directoryFormShema = z.object({
  typeOrg: z
    .string()
    .uuid()
    .min(1,'O tipo de organização não pode ser vazio'),
  partyId: z.string().min(1,'O partido não pode ser vazio'),
  cityCode: z
    .string()
    .min(5, 'O código deve ter no minino 5 digitos')
    .max(5, 'O código deve ter no maximo 5 digitos')
    .min(1,'O código da cidade não pode ser vazio'),
  address: z.string().min(3, 'O endereço não pode ficar vazio').max(255),
  cnpj: z
    .string()
    .min(14, 'O cnpj deve ter no mínimo 14 dígitos')
    .max(14, 'O cnpj deve ter no máximo 14 dígitos')
    .min(1,'O CNPJ não pode ser vazio'),
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
  cnpj: z.string().min(14).max(14).min(1,'O CNPJ não pode ser vazio'),
  siteUrl: z.string().url().optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(11).optional(),
  mailingAddress: z.string().min(3).max(255).optional(),
  vigencyStatus: z.coerce.boolean().default(true),
  cityCode: z
    .string()
    .min(5, 'O código deve ter no minino 5 digitos')
    .max(5, 'O código deve ter no maximo 5 digitos')
    .min(1,'O código da cidade não pode ser vazio'),
  typeOrgId: z.coerce
    .number()
    .positive()
    .min(1, 'O tipo de organização não pode ser vazio'),
  virgencies: z.array(virgenciesFormSchema),
})

export const leaderFormShema = z.object({
  name: z.string().min(3, 'Campo não pode ser vazio'),
  cpf: z.string().min(3, "Campo não pode ser vazio").max(14).transform((cpf)=> cpf.replace(/[^0-9]/g, '')),
  birthday: z.string().transform((value) => value ? dayjs(value).utc().format("YYYY-MM-DD") : undefined).optional(),
  email: z.string().optional(),
  oab: z.string().optional(),
  phone: z.string().transform((value )=> value.replace(/[^0-9]/g, '')).optional(),
  address: z.string().optional(),
  file: z.instanceof(FileList).optional(),
  title: z.string().transform((value )=> value.replace(/[^0-9]/g, '')).optional(),
  status: z.enum(['CASADO', 'DIVORCIADO', 'SOLTEIRO', 'VIUVO']),
  lawFirmId: z.string().optional(),
  signatureUrl: z.string().optional(),
  profession: z.string().optional(),
  importantPasswords: z.array(
    z.object({
      password: z.string().min(3, 'Campo não pode ser vazio'),
      name: z.string().min(3, 'Campo não pode ser vazio'),
    }),
  ).optional()
})

export const advocateFormShema = z.object({
  name: z.string().min(3, 'Campo não pode ser vazio'),
  cpf: z.string().max(14).transform((cpf)=> cpf.replace(/[^0-9]/g, '')),
  birthday: z.string().transform((value) => value ? dayjs(value).utc().format("YYYY-MM-DD") : undefined).optional(),
  email: z.string().optional(),
  oab: z.string().optional(),
  phone: z.string().transform((value )=> value.replace(/[^0-9]/g, '')).optional(),
  address: z.string().optional(),
  file: z.instanceof(FileList).optional(),
  title: z.string().transform((value )=> value.replace(/[^0-9]/g, '')).optional(),
  status: z.enum(['CASADO', 'DIVORCIADO', 'SOLTEIRO', 'VIUVO']),
  lawFirmId: z.string().optional(),
  signatureUrl: z.string().optional(),
})

export const lawFirmFormShema = z.object({
  name: z.string().min(3, 'Campo não pode ser vazio').min(1,),
  address: z.string().min(3, 'O endereço não pode ficar vazio').max(255),
  cnpj: z
    .string()
    .max(14, 'O cnpj deve ter no máximo 14 dígitos')
    .min(1,'O CNPJ não pode ser vazio'),
  phone: z.string().optional(),
  email: z.string().optional(),
})

export const userFormShema = z
  .object({
    id: z.coerce.number().optional(),
    name: z.string().min(3, 'Campo não pode ser vazio'),
    cpf: z.string().refine(
      (value) => {
        const cleanedValue = value.replace(/[.-]/g, '')
        return cleanedValue.length === 11 && /^\d{11}$/.test(cleanedValue)
      },
      { message: 'CPF inválido' },
    ),
    email: z.string(),
    role: z.enum(['ADMIN', 'CLIENT']).default('CLIENT'),
    password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
    disabled: z.coerce.boolean().default(true),
  })
  .transform((field) => ({
    id: field.id,
    name: field.name,
    email: field.email,
    role: field.role,
    password: field.password,
    cpf: field.cpf.replace(/[^0-9]/g, ''),
    disabled: field.disabled,
  }))

export const spcFormShema = z.object({
  directory: z.coerce
    .number()
    .positive()
    .min(1, 'O diretório não pode ser vazio'),
  spc: z.array(
    z.object({
      type: z.enum(['SPCA', 'SPCE']),
      numPge: z.string().min(1,'O número do PGE não pode ser vazio'),
      year: z.string().min(1,'O ano não pode ser vazio'),
      status: z
        .string()
        .uuid('Selecione um status')
        .min(1,'O status não pode ser vazio'),
      observation: z.string(),
    }),
  ),
})
