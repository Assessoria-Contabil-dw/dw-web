import { ChangeEvent } from 'react'
import InputBase from './InputBase'
import dayjs from 'dayjs'

interface InputYearProps {
  name: string
  handleSearchOnChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function InputYear({
  handleSearchOnChange,
  name,
  ...atr
}: InputYearProps) {
  return (
    <InputBase
      name={name}
      label="Ano"
      className='w-20'
      onChange={handleSearchOnChange}
      type="number"
      min={2017}
      max={dayjs().year()}
      placeholder={String(dayjs().year())}
      {...atr}
    />
  )
}
