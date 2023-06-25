import { Camera, FileImage } from 'lucide-react'
import { ChangeEvent, InputHTMLAttributes, useState } from 'react'

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  placeholder: string
}

export function ImgInput({ label, placeholder }: TextInputProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) return

    const previewURL = URL.createObjectURL(files[0])

    setPreviewImage(previewURL)
  }

  return (
    <label className="group flex w-full flex-col gap-1 text-sm font-semibold">
      {label}
      <label
        htmlFor="media"
        className="flex h-24 w-full max-w-sm cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300  bg-gray-50 text-gray-200 transition-colors  duration-200 group-hover:border-secundary"
      >
        {previewImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt="Assinatura"
            src={previewImage}
            className="h-full w-full object-cover"
          />
        ) : (
          <FileImage size={24} />
        )}
      </label>
      <label
        htmlFor="media"
        className="flex cursor-pointer items-center justify-start gap-2 text-xs font-medium text-gray-400 transition-colors duration-200 group-hover:text-secundary"
      >
        <Camera size={18} />
        {placeholder}
      </label>
      <input
        onChange={onFileSelected}
        className="invisible h-0 w-0"
        type="file"
        id="media"
      />
    </label>
  )
}
