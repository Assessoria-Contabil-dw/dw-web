import { AccessModuleData, AccessProps } from "@/interfaces/access.interface";
import { Check } from "lucide-react";

interface NavItemProps {
  accessArray: AccessProps;
  partyCode: string | undefined;
  stateUf: string | undefined;
  cityCode: string | undefined;

  handleChange: (
    module: AccessModuleData,
    party: string,
    state: string,
    city: string
  ) => void;
}

export default function NavItem({ accessArray, partyCode, stateUf, cityCode, handleChange }: NavItemProps) {
  return (
    <div className="mt-2 h-fit max-h-48 w-full overflow-x-auto">
      {accessArray?.partyAccess !== null ? (
        <div>
          <span className="text-label">Nacional</span>
          <ul>
            {accessArray?.partyAccess.map((item) => (
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
                    !stateUf
                  }
                  onChange={() =>
                    handleChange(
                      {
                        acessName: item.party,
                        modules: item.modules,
                      },
                      String(item.partyCode),
                      "",
                      ""
                    )
                  }
                  className={`peer/item absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0`}
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

      {accessArray?.stateAccess !== null ? (
        <div>
          <span className="text-label">Estadual</span>
          <ul>
            {accessArray?.stateAccess.map((item) => (
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
                    stateUf === item.stateId
                  }
                  onChange={() =>
                    handleChange(
                      {
                        acessName: String(item.partyCode) + " - " + item.state,
                        modules: item.modules,
                      },
                      String(item.partyCode),
                      item.stateId,
                      ""
                    )
                  }
                  className={`peer/item absolute inset-0 z-20 cursor-pointer opacity-0`}
                  value={String(item.partyCode) + " - " + item.state}
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

      {accessArray?.cityAccess !== null ? (
        <div>
          <span className="text-label">Municipal</span>
          <ul>
            {accessArray?.cityAccess.map((item) => (
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
                    !stateUf
                  }
                  onChange={() =>
                    handleChange(
                      {
                        acessName:
                          String(item.partyCode) +
                          " - " +
                          item.city +
                          "(" +
                          item.state +
                          ")",
                        modules: item.modules,
                      },
                      String(item.partyCode),
                      "",
                      item.cityCode
                    )
                  }
                  className={`peer/item absolute inset-0 z-20 cursor-pointer opacity-0`}
                  value={
                    String(item.partyCode) +
                    " - " +
                    item.city +
                    " (" +
                    item.state +
                    ")"
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
  );
}
