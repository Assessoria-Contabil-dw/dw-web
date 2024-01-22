"use client";

import { ChangeEvent, useContext, useState } from "react";
import { AccessContext } from "@/provider/context.provider";
import dayjs from "dayjs";
import SelectVigency from "../../../Search/Select/SelectVigency";
import InputBase from "../../../Search/Input/InputBase";
import ButtonPrimary from "@/components/Buttons/ButtonPrimary";
import SelectTemplate from "../../../Search/Select/SelectTemplate";
import { useTemplateVigencyPDF } from "@/hooks/useTemplate";
import { SlidersHorizontal } from "lucide-react";
import FilterDirectory from "./Form/FilterDirectory";

interface Search {
  party: string | undefined;
  state: string | undefined;
  city: string | undefined;
  directory: number | undefined;
  vigency: string | undefined;
  local: string | undefined;
  date: string | undefined;
  template: number | undefined;
  templateContent: string | undefined;
}

interface FormDocumentProps {
  onSubmit: (data: any) => void;
  onSetUrl: (data: string) => void;
  content: string | undefined;
  editor: boolean;
}

export function FormDocument({ onSubmit, content, editor, onSetUrl }: FormDocumentProps) {
  const [search, setSearch] = useState<Search>({} as Search);
  const { partyCode, cityCode, stateId } = useContext(AccessContext);
  const [isLeader, setIsLeader] = useState(false);
  const [isTools, setIsTools] = useState(false);
  const [countDirectory, setCountDirectory] = useState(1);
  const [countExtra, setCountExtra] = useState(0);

  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "state" && value === "") {
      setSearch((old) => ({ ...old, city: undefined }));
    }

    if (name === "directory") {
      const { directoryId, city } = JSON.parse(value);
      return setSearch((old) => ({
        ...old,
        vigency: undefined,
        directory: directoryId,
        local: city,
      }));
    }

    if (name === "template") {
      const { id, content } = JSON.parse(value);
      if ("options" in e.target) {
        const selectedOption = e.target.options[e.target.selectedIndex];
        const textContent = selectedOption.textContent;
        if (textContent?.includes("Individual")) {
          setIsLeader(true);
        } else {
          setIsLeader(false);
        }
      }

      setSearch((old) => ({
        ...old,
        template: id,
        templateContent: content,
      }));

      onSetUrl('');
      return onSubmit({ content });
    }

    if(name === "countDirectory"){
      return setCountDirectory( countDirectory + 1)
    }
    if(name === "countExtra"){
      return setCountExtra( countExtra + 1)
    }
    console.log(search);
    setSearch((old) => ({ ...old, [name]: value || undefined }));
  }

  const { refetch, isFetching } = useTemplateVigencyPDF(
    search.vigency,
    editor ? content : search.templateContent,
    search.local,
    search.date
  );

  async function handleSearchOnSubmit(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await refetch();

    console.log('conteudo',response.data);
    onSetUrl('');
    onSubmit({ content: response.data });
  }

  return (
    <form
      onSubmit={handleSearchOnSubmit}
      className="h-full w-full rounded-lg border-[1px] bg-white p-1 "
    >
      <div className="h-full w-full flex flex-col gap-2 overflow-y-auto  p-3 justify-between">
        <div className="space-y-2">
        <div className=" flex items-center justify-between">
      <h4 className="text-h4">Emitir documento</h4>

      <div className="relative">
        <button
          type="button"
          className="rounded-md p-1 transition-all duration-200 hover:bg-slate-100"
          onClick={() => setIsTools((old) => !old)}
        >
          <SlidersHorizontal size={18} className="text-slate-600" />
        </button>

        <div 
          onMouseLeave={() => setIsTools(!isTools)}
          className={`absolute right-0 mt-1 flex w-52 z-10 flex-col gap-1 rounded-md border-[1px] bg-white p-2
          ${isTools ? "block" : "hidden transition-all  duration-1000"}`}
        >
          <h5 className="text-h5">Campos</h5>
          <div className="flex items-center gap-2 justify-between">
            <label className="text-sm text-slate-600">Diretório</label>
            <input name="countDirectory" className="input-style w-12" type="number" min={1} max={5} defaultValue={1}/>
          </div>
          <div  className="flex items-center gap-2 justify-between">
            <label className="text-sm text-slate-600">Variavel Extra</label>

            <input 
              onChange={handleSearchOnChange} 
              name="countExtra" 
              className="input-style w-12" 
              type="number" 
              min={0} 
              max={5} 
              defaultValue={1}
              />
          </div>
        </div>

      </div>
    </div>

    <div className="flex flex-col gap-2 ">
      <SelectTemplate handleSearchOnChange={handleSearchOnChange}>
        <option value="" selected disabled>
          Selecione
        </option>
      </SelectTemplate>

      <FilterDirectory
        handleSearchOnChange={handleSearchOnChange}
        partyCode={partyCode}
        stateId={stateId}
        cityCode={cityCode}
      />

      <SelectVigency
        partyCode={partyCode}
        stateId={stateId}
        cityCode={cityCode}
        directoryId={search.directory ?? undefined}
        handleSearchOnChange={handleSearchOnChange}
      >
        <option value="" selected>
          Selecione
        </option>
      </SelectVigency>

      {isLeader && (
        <div>
          <div className="flex gap-2">
            <input type="radio" name="leader" />
            <label className="text-sm text-slate-600">Presidente</label>
          </div>
          <div className="flex gap-2">
            <input type="radio" name="leader" />
            <label className="text-sm text-slate-600">
              Vice-Presidente
            </label>
          </div>
          <div className="flex gap-2">
            <input type="radio" name="leader" />
            <label className="text-sm text-slate-600">Tesoureiro</label>
          </div>
        </div>
      )}

      <div className="grid grid-flow-col gap-1 max-2xl:grid-rows-2">
        <InputBase
          label="Data da emissão"
          type="date"
          name="date"
          defaultValue={dayjs().format("YYYY-MM-DD")}
          onChange={handleSearchOnChange}
        />
        <InputBase
          label="Local"
          type="text"
          name="local"
          className="capitalize"
          placeholder="Local"
          defaultValue={search.local}
          onChange={handleSearchOnChange}
        />
        {/* {
          Array.from(Array(countDirectory).keys()).map((i) => (
            <InputBase
              key={i}
              label={`Diretório ${i + 1}`}
              type="text"
              name="directory"
              className="capitalize"
              placeholder="Diretório"
              defaultValue={search.directory}
              onChange={handleSearchOnChange}
            />
          ))
        } */}
        
      </div>
      {/* {
          Array.from(Array(countExtra).keys()).map((i) => (
            <InputBase
              key={i}
              label={`Variavel Extra ${i + 1}`}
              type="text"
              name="extra"
              className="capitalize"
              placeholder="Variavel Extra"
              onChange={handleSearchOnChange}
            />
          ))
        } */}
    </div>
        </div>
        <ButtonPrimary
          title="Preencher documento"
          type="submit"
          variant="fill"
          loading={isFetching}
          className="w-full justify-center"
          disabled={!(search.template && search.vigency && search.local && !editor)}
        >
          {editor ? "Salve o documento" : "Preencher"}
        </ButtonPrimary>
      </div>
    </form>
  );
}
