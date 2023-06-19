"use client";

import { api } from "@/lib/api";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type PCA = {
  id: string;
  type: string;
  year: string;
  status: string;
  numPje: string;
};
type Directory = {
  id: string;
  city: string;
  state: string;
  typeOrg: string;
  SPCA: PCA[];
  SPCE: PCA[];
};
export function DirectoryTable() {
  const [directories, setDirectories] = useState<Directory[]>([]);

  // const router = useRouter();

  async function loadDirectories() {
    try {
      const response = await api.get("/directories", {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      });
      setDirectories(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadDirectories();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2>Lista de Diretórios</h2>
            <span>Total de diretorios cadastrados</span>
          </div>

          <div>
            <Link href="newDirectory">
              <button className="bg-secundary text-white">
                <Plus size={20} />
                Cadastrar Diretório
              </button>
            </Link>
          </div>
        </div>

        <div className="flex gap-4">
          <input type="search" placeholder="Buscar por Partido" />
          <input type="text" placeholder="Buscar por Nacional" />
          <input type="text" placeholder="Buscar por Estado" />
          <input type="text" placeholder="Buscar por Municipio" />
        </div>
      </div>

      <fieldset className="h-auto w-full rounded-lg px-3 py-2">
        <table>
          <thead>
            <tr>
              <th>Direção</th>
              <th>SPCA</th>
              <th>Vigência</th>
              <th>SPCE</th>
              <th>Observações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Nome</td>
              <td>
                <ul>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                </ul>
              </td>
              <td>Vigência</td>
              <td>
                <ul>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                  <li>
                    <a
                      className="bg-red-400 bg-opacity-30 text-red-400"
                      href="/"
                    >
                      2020
                    </a>
                  </li>
                </ul>
              </td>
              <td>
                lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quislorem ipsum dolor sit amet consectetur adipisicing elit.
                Quis
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
  );
}
