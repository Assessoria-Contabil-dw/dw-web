import { DocumentService } from '@/services/document.service'
import { useQuery } from 'react-query'

interface DocumentData {
  content: string
}

export function useDocumentVigency(
  vigencies: any[],
  content?: string,
  date?: string,
  partyCode?: string,
  stateId?: string,
  cityCode?: string,
  variables?: any[],
  officeId?: string,
) {
  const documentService = new DocumentService()
  const query = useQuery<DocumentData>(
    ['documentVigency'],
    () => documentService.post(vigencies, content, date, partyCode, stateId, cityCode, variables, officeId),
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
