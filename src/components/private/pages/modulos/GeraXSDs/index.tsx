"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useRef, useState, useCallback, } from "react";
import { queryClient } from "@/provider/query.provider";
import { User } from "@/hooks/Access/User/useAuth";
import { LucideDownloadCloud, LucideRefreshCw, LucideUploadCloud } from "lucide-react";
import { api } from "@/lib/api";
import { TableXSD } from './Table'
import FormularioDownload, { FormularioDownloadRef } from './FormularioDownload'
import { useNotify } from "@/components/Toast/toast"

import z from "zod";
import TableFilterXSD from "./Filter";
import ButtonBase from "@/components/Buttons/ButtonBase";

let interval: any

interface SPCProps {
  partyAbbreviation?: string;
  stateName?: string;
  cityName?: string;
  year?: string;
  colorId?: string;
  vigencyStatus?: string;
}

const schema = z.object({
  partyAbbreviation: z.string().optional(),
  stateName: z.string().optional(),
  cityName: z.string().optional(),
  year: z.string().optional(),
  colorId: z.string().optional(),
  vigencyStatus: z.string().optional(),
});

type FormDataType = z.infer<typeof schema>;

export default function GeraXSDs() {

  const notify = useNotify();

  const user: User = queryClient.getQueryData("authUser") as User;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ isFetching, setIsFetching ] = useState<boolean>(false);

  const [ filter, setFilter ] = useState<{ ano: string | null, partido: string }>({
    ano: null,
    partido: ''
  });

  const inputFileRef = useRef<HTMLInputElement>(null);
  const modalFormularioDownloadRef = useRef<FormularioDownloadRef>(null);

  const [ data, setData ] = useState<any>([]);
  const [ page, setPage ] = useState(1);
  const [ skip, setSkip ] = useState(0);
  const [ take, setTake ] = useState(15);

  const prevPage = useCallback(() => {
    setSkip((old) => Math.max(old - take, 0))
    setPage((old) => Math.max(old - 1, 0))
  }, []);

  const nextPage = useCallback(() => {
    setSkip((old) => old + take)
    setPage((old) => old + 1)
  }, []);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleButtonClick = () => {
    inputFileRef.current?.click()
  }

  const fetchData = async() => {
    clearInterval(interval)
    interval = setTimeout(() => {

      setIsFetching(true)
      api.post(`/gera_xsds`, { ...filter, itensPorPagina: take, paginaAtual: page })
      .then(response => {
        setData(response.data)
        setIsFetching(false)
      })
      .catch(error => {
        setIsFetching(false)
        notify({ type: "error", message: error.message })
      })

    }, 700)
  }

  const handleButtonRefreshClick = () => {
    fetchData()
  }

  const resetFileInput = () => {
    if (inputFileRef.current) {
      inputFileRef.current.value = ''
    }
  }

  useEffect(() => {
    fetchData()
  }, [filter, page, take])

  useEffect(() => {

    if (selectedFile) {
      setIsFetching(true)

      const formData = new FormData();
      formData.append("file", selectedFile);

      api.post(`/gera_xsds/csv`, formData)
        .then(response => {
          console.log(response.data)
          setIsFetching(false)
          setSelectedFile(null)
          resetFileInput()
          fetchData()
        })
        .catch(error => {
          setIsFetching(false)
          setSelectedFile(null)
          resetFileInput()
          notify({ type: "error", message: error.message })
        })

    }

  }, [selectedFile])

  async function handleSearchOnChange(e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
    const { name, value } = e.target;
    console.log(name, value)

    setFilter((old) => ({ ...old, [name]: value }));
    setPage(1);
    await fetchData();
  }

  const methods = useForm<FormDataType | SPCProps>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
  });

  return (
    <>
      <FormularioDownload ref={modalFormularioDownloadRef} />
      <div className="flex flex-col gap-2">
        <div className="flex items-end justify-between gap-4">
          <FormProvider {...methods}>
            <form>
              <TableFilterXSD
                onChange={handleSearchOnChange}
              />
            </form>
          </FormProvider>

          <div className="flex gap-2">
            {user?.role === "ADMIN" && (
              <>
                <input
                  accept=".csv"
                  ref={inputFileRef}
                  type="file"
                  style={{ display: "none" }}
                  id="hiddenFileInput"
                  onChange={handleFileChange}
                />
                <ButtonBase
                  className="border-none bg-primary text-black hover:bg-primaryHover hover:text-black"
                  title="Download XSD"
                  onClick={handleButtonRefreshClick}
                  disabled={isFetching}
                  loading={isFetching}
                  startIcon={<LucideRefreshCw size={16} className="h-fit w-5" />}>
                    Atualizar
                </ButtonBase>
                <ButtonBase
                  className="border-none bg-primary text-black hover:bg-primaryHover hover:text-black"
                  title="Download XSD"
                  onClick={() => modalFormularioDownloadRef.current?.openModal()}
                  disabled={isFetching}
                  loading={isFetching}
                  startIcon={<LucideDownloadCloud size={16} className="h-fit w-5" />}>
                    Download XSD
                </ButtonBase>
                <ButtonBase
                  className="border-none bg-second text-white hover:bg-secondHover hover:text-white"
                  title="Upload CSV"
                  onClick={handleButtonClick}
                  disabled={isFetching}
                  loading={isFetching}
                  startIcon={<LucideUploadCloud size={16} className="h-fit w-5" />}>
                    Upload CSV
                </ButtonBase>
              </>
            )}
          </div>
        </div>

        <TableXSD
          role={user?.role ?? "CLIENT"}
          loading={isFetching}
          data={data}
          setData={setData}
          prevPage={prevPage}
          nextPage={nextPage}
          setTake={setTake}
          setSkip={setSkip}
          setPage={setPage}
          page={page}
        />

      </div>
    </>
  );
}
