import { useState } from "react";
import { Upload, FileKey, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";

interface FormCertificateProps {
  onClose: () => void;
  directoryId: string;
}

export default function FormCertificate({
  onClose,
  directoryId,
}: FormCertificateProps) {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Por favor, selecione um arquivo de certificado");
      return;
    }

    if (!password) {
      alert("Por favor, digite a senha do certificado");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("certificate", file);
      formData.append("password", password);
      formData.append("directoryId", directoryId);

      const response = await api.post("/certificate/extract-pfx", formData);

      console.log("Resposta do upload:", response.data);

      alert("Certificado enviado com sucesso!");
      onClose();
    } catch (error: any) {
      console.error("Erro ao fazer upload do certificado:", error);
      
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.error ||
        "Erro ao fazer upload do certificado. Verifique o arquivo e a senha e tente novamente.";
      
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6">
      {/* Header Info */}
      <div className="flex items-start gap-3 rounded-lg bg-blue-50 p-4 border border-blue-200">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
        <div>
          <h3 className="text-sm font-semibold text-blue-900">
            Upload de Certificado Digital
          </h3>
          <p className="mt-1 text-xs text-blue-700">
            Faça upload do certificado digital (.pfx ou .p12) e informe a senha para validação.
            O certificado será vinculado ao diretório.
          </p>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FileKey className="h-4 w-4 text-slate-600" />
          <label className="text-sm font-semibold text-slate-700">
            Arquivo do Certificado
          </label>
          <span className="text-xs text-slate-500">*</span>
        </div>

        <div className="relative">
          <input
            id="certificate-file"
            type="file"
            accept=".pfx,.p12,.cer,.crt,.pem"
            onChange={handleFileChange}
            disabled={isLoading}
            className="peer sr-only"
          />
          <label
            htmlFor="certificate-file"
            className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-slate-50 p-8 transition-all hover:bg-slate-100 hover:border-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-50 ${
              file
                ? "border-green-400 bg-green-50"
                : "border-slate-300"
            }`}
          >
            {file ? (
              <CheckCircle2 className="h-12 w-12 text-green-600 mb-3" />
            ) : (
              <Upload className="h-12 w-12 text-slate-400 mb-3" />
            )}
            
            <p className="text-sm font-medium text-slate-700">
              {file ? "Arquivo selecionado" : "Clique para selecionar o certificado"}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {file ? `${file.name} (${(file.size / 1024).toFixed(2)} KB)` : "Formatos aceitos: .pfx, .p12, .cer, .crt, .pem"}
            </p>
          </label>
        </div>

        {file && (
          <div className="flex items-center gap-2 rounded-md bg-green-50 border border-green-200 p-3">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <div className="flex-1">
              <p className="text-xs font-medium text-green-800">{file.name}</p>
              <p className="text-xs text-green-600">
                Tamanho: {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Password Section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-slate-600" />
          <label className="text-sm font-semibold text-slate-700">
            Senha do Certificado
          </label>
          <span className="text-xs text-slate-500">*</span>
        </div>

        <div className="relative">
          <input
            type="password"
            placeholder="Digite a senha do certificado"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50"
          />
          <Lock className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="rounded-md bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs text-amber-800">
            <strong>Importante:</strong> A senha é necessária para validar e extrair as informações do certificado.
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 border-t border-slate-200 pt-4">
        <button
          type="button"
          onClick={onClose}
          disabled={isLoading}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isLoading || !file || !password}
          className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primaryHover hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Enviando...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4" />
              Fazer Upload
            </>
          )}
        </button>
      </div>
    </form>
  );
}
