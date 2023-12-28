import SearchTemplate from '@/components/Search/template'
import { EditorTemplate } from './Editor'
import { ChangeEvent, useState } from 'react'

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
          <div>
            <SearchTemplate handleSearchOnChange={handleSearchOnChange} />
          </div>
          <div className="flex w-full flex-col justify-between">
            <label htmlFor="name" className="text-xs">
              Nome do template
            </label>
            <input
              type="text"
              value={search.name}
              name="name"
              placeholder="Nome do template"
              onChange={handleSearchOnChange}
            />
          </div>
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
