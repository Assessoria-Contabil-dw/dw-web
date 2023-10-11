import { api } from '@/lib/api'
import { useQuery } from 'react-query'

type PartyProps = {
  code: string
  name: string
  abbreviation: string
  logoUrl: string
} | null

export default function SelectParty() {
  const { data } = useQuery<PartyProps[]>(
    ['partiesAll'],
    async () => {
      const response = await api
        .get('/parties/all')
        .then((response) => response.data)
      console.log(response)
      return response
    },
    {
      staleTime: 1000 * 60, // 1 minute
    },
  )

  return (
    <div>
      <select>
        <option disabled>Selecione um partido</option>
        {data?.map((party) => (
          <option key={party?.code}>
            {party?.code} - {party?.abbreviation}
          </option>
        ))}
      </select>
    </div>
  )
}
