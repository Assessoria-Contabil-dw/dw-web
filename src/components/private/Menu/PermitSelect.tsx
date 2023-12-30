'use client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { AccessContext } from '@/provider/context.provider'
import { useAuth } from '@/lib/auth'
import NavigationModule from './NavModule'
import { AccessModuleData, AccessProps } from '@/interfaces/modules'
import { useAccessData } from '@/hooks/useAccessData'

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
  const { data, isLoading } = useAccessData()
  const [isSelect, setIsSelect] = useState(false)
  const [isFilter, setIsFilter] = useState<AccessProps>()

  function handleChange(
    modules: AccessModuleData,
    party: string,
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

  useEffect(() => {
    setIsFilter(data)
  }, [])

  if (isLoading) return null

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

    const filterDistrict = data?.acessDistrict?.filter((item) =>
      item.city.startsWith(e.target.value.toUpperCase()),
    )

    if (!filterParty && !filterState && !filterCity && !filterDistrict) {
      setIsFilter({
        acessCity: null,
        acessParty: null,
        acessState: null,
        acessDistrict: null,
      })
      return
    }

    setIsFilter({
      acessParty: filterParty?.length ? filterParty : null,
      acessCity: filterCity?.length ? filterCity : null,
      acessState: filterState?.length ? filterState : null,
      acessDistrict: filterDistrict?.length ? filterDistrict : null,
    })
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
            <label htmlFor="access" className="text-label cursor-pointer">
              Acesso
            </label>

            <div className="input-style flex items-center justify-between">
              <div>
                {modulesArray === undefined
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
            <input
              type="text"
              placeholder="Buscar"
              onChange={handleFilter}
              className="input-style"
            />

            <div className="mt-2 h-48 w-full overflow-x-auto">
              {isFilter?.acessParty !== null ? (
                <div>
                  <span className="text-label">Nacional</span>
                  <ul>
                    {isFilter?.acessParty.map((item) => (
                      <li
                        key={item.id}
                        className="text-select relative mr-1 flex cursor-pointer items-center justify-between px-2 py-1"
                      >
                        <input
                          type="radio"
                          name="party"
                          checked={
                            partyCode === String(item.partyCode) &&
                            !cityCode &&
                            !stateId
                          }
                          onChange={() =>
                            handleChange(
                              {
                                acessName: item.party,
                                modules: item.modules,
                              },
                              String(item.partyCode),
                              '',
                              '',
                            )
                          }
                          className={`peer/item absolute inset-0 z-20 cursor-pointer opacity-0`}
                          value={item.party}
                          data-label={item.party}
                        />

                        <label
                          htmlFor={String(String(item.partyCode))}
                          className="text-slate-600 peer-checked/item:font-semibold"
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
                  <span className="text-label">Estadual</span>
                  <ul>
                    {isFilter?.acessState.map((item) => (
                      <li
                        key={item.id}
                        className="text-select relative mr-1 flex cursor-pointer items-center justify-between px-2 py-1"
                      >
                        <input
                          type="radio"
                          name="party"
                          checked={
                            partyCode === String(item.partyCode) &&
                            !cityCode &&
                            stateId === item.stateId
                          }
                          onChange={() =>
                            handleChange(
                              {
                                acessName:
                                  String(item.partyCode) + ' - ' + item.state,
                                modules: item.modules,
                              },
                              String(item.partyCode),
                              item.stateId,
                              '',
                            )
                          }
                          className={`peer/item absolute inset-0 z-20 cursor-pointer opacity-0`}
                          value={String(item.partyCode) + ' - ' + item.state}
                          data-label={item.state}
                        />
                        <label
                          htmlFor={item.stateId}
                          className="text-slate-600 peer-checked/item:font-semibold"
                        >
                          {String(item.partyCode)} - {item.stateId}
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
                  <span className="text-label">Municipal</span>
                  <ul>
                    {isFilter?.acessCity.map((item) => (
                      <li
                        key={item.id}
                        className="text-select relative mr-1 flex cursor-pointer items-center justify-between px-2 py-1"
                      >
                        <input
                          type="radio"
                          name="party"
                          checked={
                            partyCode === String(item.partyCode) &&
                            cityCode === item.cityCode &&
                            !stateId
                          }
                          onChange={() =>
                            handleChange(
                              {
                                acessName:
                                  String(item.partyCode) +
                                  ' - ' +
                                  item.city +
                                  '(' +
                                  item.state +
                                  ')',
                                modules: item.modules,
                              },
                              String(item.partyCode),
                              '',
                              item.cityCode,
                            )
                          }
                          className={`peer/item absolute inset-0 z-20 cursor-pointer opacity-0`}
                          value={
                            String(item.partyCode) +
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
                          className="text-slate-600 peer-checked/item:font-semibold"
                        >
                          {String(item.partyCode)} - {item.city} ({item.state})
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
        modules={modulesArray !== undefined ? modulesArray?.modules : []}
      />
    </div>
  )
}
