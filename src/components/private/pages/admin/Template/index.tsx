'use client'
import { EditorTemplate } from './Editor'
import { ChangeEvent, useState } from 'react'
import SelectTemplate from '@/components/private/Search/Select/SelectTemplate'
import InputBase from '@/components/private/Search/Input/InputBase'
import TemplateDicionary from '@/components/private/Tools/Dicionary'

interface Search {
  templateId: number | undefined
  content: string
  name: string
}

export function Templates() {
  const [search, setSearch] = useState<Search>({
    templateId: undefined,
    content: '',
    name: '',
  })
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
    <>
      <div className="flex w-full flex-col gap-2">
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
        <div className="flex gap-2">
          <EditorTemplate
            templateId={search.templateId}
            name={search.name}
            content={search.content}
          />
          <div className="h-[500px] flex-1">
            <TemplateDicionary />
          </div>
        </div>
      </div>
    </>
  )
}
