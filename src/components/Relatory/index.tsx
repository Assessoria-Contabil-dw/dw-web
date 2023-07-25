export function RelatoryView() {
  return (
    <div className="flex gap-4">
      <div className="w-96">
        <form>
          <select>
            <option value="volvo">Selecione um diretorio</option>
          </select>

          <select>
            <option value="volvo">Selecione uma vigencia</option>
          </select>

          <button>Gerar</button>
        </form>
      </div>
      <div className="flex-1">
        <iframe
          className="h-[600px] w-full max-w-[800px]"
          src="https://www.saude.go.gov.br/files/escola-saude/manual-de-uso-do-site.pdf"
          title="Iframe Example"
        ></iframe>
      </div>
    </div>
  )
}
