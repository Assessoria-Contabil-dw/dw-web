import { EditorTemplate } from './Editor'
import { ChangeEvent, useState } from 'react'
import SelectTemplate from '@/components/private/Search/Select/SelectTemplate'
import InputBase from '@/components/private/Search/Input/InputBase'

interface Search {
  templateId: number | undefined
  content: string | undefined
  name: string | undefined
}

export function Templates() {
  const [search, setSearch] = useState<Search>({} as Search)
  function handleSearchOnChange(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) {
    const { name, value } = e.target

    if (name === 'template') {
      const { id, name, content } = JSON.parse(value)

      setSearch((old) => ({
        ...old,
        templateId: id,
        name,
        content,
      }))
    }

    setSearch((old) => ({
      ...old,
      [name]: value,
    }))
  }

  return (
    <main className="h-full flex-1 overflow-auto px-32 max-lg:px-4">
      <div className="flex flex-col gap-2 py-12">
        <div className="flex gap-2">
          <div className="w-72">
            <SelectTemplate handleSearchOnChange={handleSearchOnChange}>
              <option value="" selected disabled>
                Selecione um template
              </option>
            </SelectTemplate>
          </div>
          <InputBase
            label="Nome do template"
            type="text"
            value={search.name}
            name="name"
            placeholder="Nome do template"
            onChange={handleSearchOnChange}
          />
        </div>
        <div>
          <EditorTemplate
            templateId={search.templateId}
            name={search.name}
            content={search.content}
          />
        </div>
      </div>
    </main>
  )
}
