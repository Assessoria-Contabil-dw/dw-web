import { Camera, FileImage } from "lucide-react";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { useFormContext } from "react-hook-form";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  signatureUrl?: string;
}

export function ImgInput({ name, signatureUrl, ...props }: TextInputProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files) return;

    const previewURL = URL.createObjectURL(files[0]);

    setPreviewImage(previewURL);
  }

  const { register } = useFormContext();

  return (
    <div className="group relative flex h-full w-full flex-col gap-2 ">
      <div className="flex h-full flex-col gap-1">
        <label
          htmlFor={name}
          className="flex h-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300  bg-gray-50 text-gray-200 transition-colors  duration-200 group-hover:border-second"
        >
          {previewImage || signatureUrl ? (
            <picture className="h-full w-full">
              <img
                alt="Assinatura"
                src={
                  signatureUrl ?  `https://arquivos.contabilidadepartidaria.com.br/assinaturas/${signatureUrl}` :
                  previewImage  || ""               
                }
                className="h-full w-full object-contain"
              />
            </picture>
          ) : (
            <FileImage size={24} />
          )}
        </label>
        <label
          htmlFor={name}
          className="group-hover:text-secundary flex mb-4 cursor-pointer items-center justify-start gap-2 text-xs font-medium text-gray-400 transition-colors duration-200"
        >
          <Camera size={18} />
          Anexar imagem
        </label>
      </div>

      <input
        {...register(name)}
        {...props}
        onChange={onFileSelected}
        className="absolute h-0 w-0 opacity-0"
        type="file"
        name={name}
        id={name}
      />
    </div>
  );
}
