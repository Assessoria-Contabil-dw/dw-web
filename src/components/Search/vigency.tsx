import { api } from '@/lib/api'
import { AccessContext } from '@/provider/context.provider'
import { ChangeEvent, useContext } from 'react'
import { useQuery } from 'react-query'
import { LoadingSecond } from '../Loading/second'

interface SearchVigencyProps {
  directoryId: number | undefined
  handleSearchOnChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

interface Leader {
  id: number
  name: string
  signatureUrl: string
}
interface Vigency {
  id: number
  dateFirst: string
  dateLast: string
  status: boolean
  president: Leader
  vicePresident: Leader
  treasurer: Leader
  advocate: Leader
}

interface VProps {
  directoryId: string
  status: boolean
  surname: string
  vigencyActive: Vigency[]
  vigencyInactive: Vigency[]
}

export default function SearchVigency({
  handleSearchOnChange,
  directoryId,
}: SearchVigencyProps) {
  const { partyCode, cityCode, stateId } = useContext(AccessContext)

  const { data, isLoading } = useQuery<VProps>(
    ['vigencies', directoryId],
    async () => {
      if (directoryId === undefined) return []
      const response = await api.get(`/vigencies/directory/${directoryId}`, {
        params: {
          partyCode: partyCode === 0 ? null : partyCode,
          cityCode,
          stateId,
        },
      })
      return response.data
    },
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
    },
  )

  return (
    <div className="flex w-full min-w-[90px] flex-col justify-between gap-1">
      <div className="flex gap-1">
        <label htmlFor="vigency" className="text-xs">
          Vigência
        </label>
        {isLoading && <LoadingSecond />}
      </div>

      <select name="vigency" onChange={handleSearchOnChange}>
        <option value="">Selecione</option>
        {data !== undefined && data.vigencyActive
          ? data.vigencyActive.map((vA) => (
              <option key={vA.id} value={vA.id}>
                {vA.dateFirst} - {vA.dateLast}
              </option>
            ))
          : null}
        {data !== undefined && data.vigencyInactive
          ? data.vigencyInactive.map((vI) => (
              <option className="text-slate-600" key={vI.id} value={vI.id}>
                {vI.dateFirst} - {vI.dateLast}
              </option>
            ))
          : null}
      </select>
    </div>
  )
}

/*
<main>
<p style="text-align: center; padding-top: 72px;">PROCURA&Ccedil;&Atilde;O <strong><em>AD JUDICIA ET EXTRA</em></strong></p>
<p style="text-align: center;">&nbsp;</p>
<p style="text-align: left;"><strong>OUTORGANTE:</strong></p>
<p style="text-align: justify;">${PARTIDO} - ${PARTIDO_SIGLA}/${SUR_NAME}, inscrito no CNPJ sob n. ${CNPJ}, com endere&ccedil;o para notifica&ccedil;&atilde;o &agrave; ${ENDERE&Ccedil;O}, neste ato representado por seu presidente, Sr(a). ${PRESIDENTE}, ${QUALIFICA&Ccedil;&Atilde;O}, inscrita no CPF sob o n. ${CPF}, residente e domiciliada &agrave; ${ENDERE&Ccedil;O}.</p>
<p style="text-align: left;">&nbsp;</p>
<p style="text-align: left;"><strong>OUTORGANTE</strong>:</p>
<p style="text-align: justify;"><strong>${ADV_1}</strong>, portador(a) do registro ${OAB_1}, cadastrado no Minist&eacute;rio da Fazenda sob n. ${CPF_1}, e-mail: ${EMAIL} e $<strong>{ADV_2}</strong>, portador(a) do registro ${OAB_2}, inscrito no CPF sob n. ${CPF_2}, ambos com endere&ccedil;o profissional situado na ${END_2}, e- mail: ${EMAIL_2}, conferindo- lhes os poderes da cl&aacute;usula <strong><em>"ad judicia et extra"</em></strong> para em qualquer&nbsp;inst&acirc;ncia ou tribunal defenderem os seus interesses, propor a&ccedil;&atilde;o, nela podendo&nbsp;contestar, reconvir, recorrer e impetrar mandados, acompanhando os processos at&eacute; o&nbsp;seu tr&acirc;nsito final, confere tamb&eacute;m os poderes especiais para desistir, renunciar a&nbsp;direito em que se funda&ccedil;&atilde;o, transigir, acordar, firmar termos e compromissos, prestar declara&ccedil;&atilde;o, receber e quitar, juntar e desentranhar documentos, requerer&nbsp;administrativamente ou judicialmente o que de direito, bem como substabelecer o&nbsp;presente mandato com ou sem reserva a pessoa de confian&ccedil;a.</p>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: justify;">&nbsp;</p>
<p style="text-align: right;">${DATA}, ${LOCAL}</p>
<p style="text-align: center;">&nbsp;</p>
<div style="text-align: center; display: relative;"><img style="display: absolute; transform: translateY(50%); margin-left: auto; margin-right: auto;" src="{&#96;$SIGNATURE_PRESIDENTE&#96;}" width="194" height="90"> <br>_________________________________________</div>
<p style="text-align: center;">${PRESIDENTE} - Presidente</p>
</main>
*/
