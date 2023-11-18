'use client'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useContext, useState } from 'react'
import NavigationModule from './Modules'
import { AccessContext, ModulesData } from '@/services/context.provider'
import { queryClient } from '@/services/query.provider'
import { PermitProps } from '@/app/(user)/layout'
import { usePathname } from 'next/navigation'
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
    handleSetRouter,
  } = useContext(AccessContext)
  const path = usePathname()
  const user = useAuth()
  const [isSelect, setIsSelect] = useState(false)

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
      handleSetRouter(path)
      return
    }

    if (state) {
      setStateId(state)
      setCityCode('')
      handleSetRouter(path)
      return
    }
    if (city) {
      setStateId('')
      setCityCode(city)
      handleSetRouter(path)
    }
    handleSetRouter(path)
  }

  const data: PermitProps = queryClient.getQueryData(
    'permitions',
  ) as PermitProps

  if (user?.role === 'CLIENT') {
    if (!data) {
      return null
    }
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
                {modulesArray.acessName
                  ? modulesArray.acessName
                  : 'Selecione o acesso'}
              </div>
              <ChevronsUpDown size={16} className="text-slate-400" />
            </div>
          </div>

          <div
            className={` ${
              isSelect ? 'block' : 'hidden'
            } absolute mt-1 w-full rounded border-[1px] border-slate-300 bg-white p-1`}
          >
            {data.acessParty !== null ? (
              <div>
                <span>Nacional</span>
                <ul>
                  {data.acessParty.map((item) => (
                    <li
                      key={item.id}
                      className={`relative flex cursor-pointer items-center justify-between p-1 text-xs hover:bg-slate-100 `}
                    >
                      <input
                        type="radio"
                        name="party"
                        checked={
                          partyCode === item.partyCode && !cityCode && !stateId
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

            {data.acessState !== null ? (
              <div>
                <span>Estadual</span>
                <ul>
                  {data?.acessState.map((item) => (
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

            {data.acessCity !== null ? (
              <div>
                <span>Municipal</span>
                <ul>
                  {data?.acessCity.map((item) => (
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
      )}

      <NavigationModule
        modules={modulesArray != null ? modulesArray.modules : []}
      />
    </div>
  )
}
