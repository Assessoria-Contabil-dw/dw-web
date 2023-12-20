'use client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import NavigationModule from './Modules'
import { AccessContext, ModulesData } from '@/provider/context.provider'
import { queryClient } from '@/provider/query.provider'
import { PermitProps } from '@/app/(user)/layout'
import { useAuth } from '@/lib/auth'

export default function PermitSelect() {
  const {
    partyCode,
    cityCode,
    stateId,
    modulesArray,
    setModulesArray,
    setPartyCode,
    setStateId,
    setCityCode,
  } = useContext(AccessContext)
  const user = useAuth()
  const [isSelect, setIsSelect] = useState(false)
  const [isFilter, setIsFilter] = useState<PermitProps>()

  function handleChange(
    modules: ModulesData,
    party: number,
    state: string,
    city: string,
  ) {
    setPartyCode(party)
    setModulesArray(modules)

    setIsSelect(!isSelect)

    if (!city && !state) {
      setStateId('')
      setCityCode('')
      return
    }

    if (state) {
      setStateId(state)
      setCityCode('')
      return
    }
    if (city) {
      setStateId('')
      setCityCode(city)
    }
  }

  const data: PermitProps = queryClient.getQueryData(
    'permitions',
  ) as PermitProps

  useEffect(() => {
    setIsFilter(data)
  }, [])

  if (user?.role === 'CLIENT') {
    if (!data) {
      return null
    }
  }

  function handleFilter(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value.length < 2) {
      setIsFilter(data)
      return
    }
    const filterParty = data?.acessParty?.filter((item) =>
      item.party.startsWith(e.target.value.toUpperCase()),
    )

    const filterState = data?.acessState?.filter((item) =>
      item.state.startsWith(e.target.value.toUpperCase()),
    )

    const filterCity = data?.acessCity?.filter((item) =>
      item.city.startsWith(e.target.value.toUpperCase()),
    )

    if (!filterParty && !filterState && !filterCity) {
      setIsFilter({ acessCity: null, acessParty: null, acessState: null })
      return
    }

    setIsFilter({
      acessParty: filterParty?.length ? filterParty : null,
      acessCity: filterCity?.length ? filterCity : null,
      acessState: filterState?.length ? filterState : null,
    })

    console.log(e.target.value, isFilter)
  }

  return (
    <div className="flex flex-col gap-2">
      {user?.role === 'ADMIN' ? null : (
        <div className="relative">
          <input
            onClick={() => setIsSelect(!isSelect)}
            type="checkbox"
            className="peer/access absolute inset-0 z-20 cursor-pointer opacity-0"
          />
          <div>
            <label
              htmlFor="access"
              className="cursor-pointer font-alt text-xs font-medium peer-checked/access:text-primaryHover"
            >
              Acesso
            </label>

            <div
              className="inputStyle flex items-center justify-between text-slate-600
        peer-checked/access:border-primary"
            >
              <div>
                {modulesArray === null
                  ? 'Selecione o acesso'
                  : modulesArray.acessName}
              </div>
              <ChevronsUpDown size={16} className="text-slate-400" />
            </div>
          </div>

          <div
            className={` ${
              isSelect ? 'block' : 'hidden'
            } absolute mt-1  rounded border-[1px] border-slate-300 bg-white p-1 shadow-md`}
          >
            <input type="text" placeholder="Buscar" onChange={handleFilter} />

            <div className="mt-2 h-48 w-full overflow-x-auto">
              {isFilter?.acessParty !== null ? (
                <div>
                  <span>Nacional</span>
                  <ul>
                    {isFilter?.acessParty.map((item) => (
                      <li
                        key={item.id}
                        className={`relative flex cursor-pointer items-center justify-between p-1 text-xs hover:bg-slate-100 `}
                      >
                        <input
                          type="radio"
                          name="party"
                          checked={
                            partyCode === item.partyCode &&
                            !cityCode &&
                            !stateId
                          }
                          onChange={() =>
                            handleChange(
                              {
                                acessName: item.party,
                                modules: item.modules,
                              },
                              item.partyCode,
                              '',
                              '',
                            )
                          }
                          className={`peer/item absolute inset-0 z-20 cursor-pointer opacity-0`}
                          value={item.party}
                          data-label={item.party}
                        />
                        <label
                          htmlFor={String(item.partyCode)}
                          className="text-slate-600 peer-checked/item:font-medium"
                        >
                          {item.party}
                        </label>

                        <Check
                          size={14}
                          className="hidden text-second peer-checked/item:block"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {isFilter?.acessState !== null ? (
                <div>
                  <span>Estadual</span>
                  <ul>
                    {isFilter?.acessState.map((item) => (
                      <li
                        key={item.id}
                        className={`relative flex cursor-pointer items-center justify-between p-1 text-xs hover:bg-slate-100`}
                      >
                        <input
                          type="radio"
                          name="party"
                          checked={
                            partyCode === item.partyCode &&
                            !cityCode &&
                            stateId === item.stateId
                          }
                          onChange={() =>
                            handleChange(
                              {
                                acessName: item.partyCode + ' - ' + item.state,
                                modules: item.modules,
                              },
                              item.partyCode,
                              item.stateId,
                              '',
                            )
                          }
                          className={`peer/item absolute inset-0 z-20 cursor-pointer opacity-0`}
                          value={item.partyCode + ' - ' + item.state}
                          data-label={item.state}
                        />
                        <label
                          htmlFor={item.stateId}
                          className="font-medium text-slate-600"
                        >
                          {item.partyCode} - {item.stateId}
                        </label>

                        <Check
                          size={14}
                          className="hidden text-second peer-checked/item:block"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {isFilter?.acessCity !== null ? (
                <div>
                  <span>Municipal</span>
                  <ul>
                    {isFilter?.acessCity.map((item) => (
                      <li
                        key={item.id}
                        className={`relative flex cursor-pointer items-center justify-between p-1 text-xs hover:bg-slate-100`}
                      >
                        <input
                          type="radio"
                          name="party"
                          checked={
                            partyCode === item.partyCode &&
                            cityCode === item.cityCode &&
                            !stateId
                          }
                          onChange={() =>
                            handleChange(
                              {
                                acessName:
                                  item.partyCode +
                                  ' - ' +
                                  item.city +
                                  '(' +
                                  item.state +
                                  ')',
                                modules: item.modules,
                              },
                              item.partyCode,
                              '',
                              item.cityCode,
                            )
                          }
                          className={`peer/item absolute inset-0 z-20 cursor-pointer opacity-0`}
                          value={
                            item.partyCode +
                            ' - ' +
                            item.city +
                            ' (' +
                            item.state +
                            ')'
                          }
                          data-label={item.city}
                        />
                        <label
                          htmlFor={item.cityCode}
                          className="font-medium text-slate-600"
                        >
                          {item.partyCode} - {item.city} ({item.state})
                        </label>

                        <Check
                          size={14}
                          className="hidden text-second peer-checked/item:block"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      <NavigationModule
        modules={modulesArray !== null ? modulesArray.modules : []}
      />
    </div>
  )
}
