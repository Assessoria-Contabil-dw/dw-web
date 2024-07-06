import { useState } from "react";
import { Menu } from "./Menu";
import { FormDocument } from "./Form";
import { LoadingPrimary } from "@/components/Loading/primary";

interface DocumentProps {
  content?: string
}

interface FormRelatoryProps {
  handleFormSubmit: (data: DocumentProps) => void;
}

export default function FormRelatory({ handleFormSubmit }: FormRelatoryProps) {
  const [progressBar, setProgressBar] = useState(1);
  const [relatoryOption, setRelatoryOption] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handlePrevProgressBar(id: number) {
    if (progressBar === 1) return;
    if (progressBar === 2 && id === 3) return;
    setProgressBar(id);
  }



  return (
    <div className="flex h-fit w-full flex-col gap-4 rounded-lg border-[1px] bg-white p-4">
      <div className="flex flex-col gap-3">
        <div className="leading-3">
          <h2 className="text-base font-medium text-gray-800">
            Gerar Relatório
          </h2>
          <span className="text-span">
            Selecione o tipo de relatorio que deseja gerar
          </span>
        </div>
        <div className="flex w-full flex-row gap-2 bg-slate-100">
          <button
            onClick={() => handlePrevProgressBar(1)}
            className={`h-2 w-full cursor-pointer rounded-full  ${
              progressBar === 1 || progressBar === 2 || progressBar === 3
                ? "bg-second"
                : "bg-slate-200"
            }`}
          ></button>
          <button
            onClick={() => handlePrevProgressBar(2)}
            className={`h-2 w-full cursor-pointer rounded-full  ${
              progressBar === 2 || progressBar === 3
                ? "bg-second"
                : "bg-slate-200"
            }`}
          ></button>
          <button
            onClick={() => handlePrevProgressBar(3)}
            className={`h-2 w-full cursor-pointer rounded-full  ${
              progressBar === 3 ? "bg-second" : "bg-slate-200"
            }`}
          ></button>
        </div>
      </div>
      {progressBar === 1 && (
        <Menu
          relatoryOption={relatoryOption}
          setRelatory={setRelatoryOption}
          progressBar={setProgressBar}
        />
      )}
      {(progressBar === 2 || progressBar === 3) && (
        <div className={progressBar === 3 ? "hidden opacity-0" : "opacity-100"}>
          <FormDocument
            content="oi"
            editor={true}
            onSubmit={handleFormSubmit}
            relatoryOption={relatoryOption}
            progressBar={setProgressBar}
          />
        </div>
      )}

      {progressBar === 3 && (
        <div className="flex w-full flex-col items-center justify-center gap-4">
          <LoadingPrimary />
          <h2 className="text-h4 text-slate-500">Gerando relatorio ...</h2>
        </div>
      )}
    </div>
  );
}
