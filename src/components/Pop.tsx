import { X } from 'lucide-react'

interface PopProps {
  text: string
  isOpen: boolean
  onClose: () => void
}

export function Pop({ text, onClose, isOpen }: PopProps) {
  if (!isOpen) {
    return null
  }

  function handleClosePop() {
    onClose()
  }

  return (
    <div className="absolute bottom-5 right-10 flex w-96 flex-col rounded-md border-[1px] border-zinc-200 bg-white text-gray-800 shadow-lg">
      <div className="flex flex-row justify-between bg-gray-200 p-3 text-gray-600">
        <h5>Observação</h5>
        <button className="h-fit w-fit p-0" onClick={handleClosePop}>
          <X className="h-4 w-4 rounded-full" />
        </button>
      </div>
      <div className="p-3">
        <p className="font-alt text-xs">{text}</p>
      </div>
    </div>
  )
}
