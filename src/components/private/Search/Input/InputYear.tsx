import { ChangeEvent } from 'react'
import InputBase from './InputBase'
import dayjs from 'dayjs'

interface InputYearProps {
  handleSearchOnChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function InputYear({
  handleSearchOnChange,
  ...atr
}: InputYearProps) {
  return (
    <InputBase
      name="year"
      label="Ano"
      onChange={handleSearchOnChange}
      type="number"
      min={2017}
      max={dayjs().year()}
      placeholder={String(dayjs().year())}
      {...atr}
    />
  )
}
