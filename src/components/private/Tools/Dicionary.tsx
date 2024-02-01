"use client";
import { ChangeEvent, useState } from "react";
import InputBase from "../Search/Input/InputBase";
import { DICIONARY_VARIABLES, Table } from "./dicionary.variables";

interface DictionaryProps {
  className?: string;
}

export default function Dicionary({ className }: DictionaryProps) {
  

  const [dictionary, setDictionary] = useState<Table[]>(DICIONARY_VARIABLES);

  function handleFilter(term: string) {
    if (term.length < 2) {
      setDictionary(DICIONARY_VARIABLES);
      return;
    }

    const filteredDictionary = DICIONARY_VARIABLES.map((table) => {
      const filteredTable: Table = {};
      for (const key in table) {
        if (Object.prototype.hasOwnProperty.call(table, key)) {
          const filteredValues = table[key]?.filter((value: any) =>
            value.toLowerCase().includes(term.toLowerCase())
          );
          if (filteredValues && filteredValues.length > 0) {
            filteredTable[key] = filteredValues;
          }
        }
      }
      return filteredTable;
    });

    setDictionary(filteredDictionary);
  }

  const onDragStart = (event: any) => {
    event.dataTransfer.setData(
      "text/html",
      `${"${" + event.target.textContent + "}"}`
    );
  };

  return (
    <div
      className={`h-full w-full rounded-lg border-[1px] bg-white p-2 ${className}`}
    >
      <div className="h-full w-full space-y-2 overflow-auto p-1">
        <InputBase
          label="Palavra-chave"
          type="text"
          placeholder="Digite a palavra-chave..."
          onChange={(e) => handleFilter(e.target.value)}
          className="input-style"
        />
        {dictionary.map((table, index) => (
          Object.values(table)[0] &&
          <table key={index}>
            <thead>
              <tr>
                <th className="border-none text-left">{Object.keys(table)}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div>
                    {Object.values(table)[0] && (
                      Object.values(table).map((value, index) =>
                      value 
                        ? value?.map((value: any, index: number) => (
                            <div
                              key={index}
                              draggable="true"
                              onDragStart={(event) => onDragStart(event)}
                              id={`${Object.keys(table)}_${index.toString()}`}
                              className="float-left m-1 w-fit cursor-move rounded-md 
                    border-[1px] bg-white px-2 py-1 uppercase text-slate-400 
                    transition-all duration-100 hover:text-slate-600
                    hover:shadow-sm hover:transition-all hover:duration-100"
                            >
                              {value}
                            </div>
                          ))
                        : null
                    ))}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
}
