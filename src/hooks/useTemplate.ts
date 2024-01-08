import { TemplateProps } from '@/interfaces/modules'
import { TemplateService } from '@/services/template.service'
import { useQuery } from 'react-query'

interface DocumentData {
  content: string
}

export function useTemplateData() {
  const templateService = new TemplateService()

  const query = useQuery<TemplateProps[]>(
    ['templateData'],
    () => templateService.getAll(),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: false,
      refetchOnWindowFocus: false,
    },
  )

  return query
}

export function useTemplateVigencyPDF(
  id?: string,
  content?: string,
  local?: string,
  date?: string,
) {
  const templateService = new TemplateService()
  const query = useQuery<DocumentData>(
    ['documentData'],
    () => templateService.getVigency(id, content, local, date),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: false,
    },
  )

  return query
}

export function useTemplateUpdate(
  content: string | undefined,
  id?: number,
  name?: string,
) {
  const templateService = new TemplateService()

  const query = useQuery<TemplateProps>(
    ['templateUpdate', content, id, name],
    () => templateService.putById(content, id, name),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: false,
    },
  )

  return query
}

export function useTemplateCreate(name?: string, content?: string) {
  const templateService = new TemplateService()

  const query = useQuery<TemplateProps>(
    ['templateCreate'],
    () => templateService.post(name, content),
    {
      keepPreviousData: true,
      staleTime: 1000 * 60 * 60 * 12,
      retry: 1,
      refetchOnWindowFocus: false,
      enabled: false,
    },
  )

  return query
}
