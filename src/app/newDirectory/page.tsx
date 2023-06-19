export default function NewDirectory() {
  return (
    <div className="bg-orange-500">
      <form className="flex h-5/6 overflow-hidden overflow-y-auto flex-col gap-4 w-full ">
          <fieldset className="flex flex-col gap-4">
            <legend>Diretório</legend>
            <div className="flex flex-row gap-4">
              <input
                type="text"
                name="partyId"
                id="partyId"
                placeholder="Partido"
              />
              <input
                type="text"
                name="cityId"
                id="cityId"
                placeholder="Cidade"
              />
              <input type="text" name="cnpj" id="cnpj" placeholder="CNPJ" />
            </div>
            <div className="flex gap-4">
              <input
                className="w-auto"
                type="search"
                name="cpf"
                id="cpf"
                placeholder="CPF"
              />
              <input className="w-full" type="text" name="address" id="address" placeholder="Endereço" />              
            </div>

            <div className="flex flex-row gap-4">
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Telefone"
              />
              <input type="email" name="email" id="email" placeholder="Email" />
              <input type="text" name="site" id="site" placeholder="Site" />

            </div>
          </fieldset>

          <div>
            <button>Add</button>
          </div>

          <fieldset className="flex flex-col gap-4">
            <legend>Virgência 01</legend>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <input
                  type="date"
                  name="dateFirst"
                  id="dateFirst"
                  placeholder="Data Inicial"
                />
                <input
                  type="date"
                  name="dateLast"
                  id="dateLast"
                  placeholder="Data Final"
                />
                <button>Adicionar Representante</button>
              </div>

              <div className="flex flex-row gap-4">
                <select name="" id="">
                  <option value="">Representante</option>
                </select>
                <select name="" id="">
                  <option value="">Cargo</option>
                </select>
              </div>
              <div className="flex flex-row gap-4">
                <select name="" id="">
                  <option value="">Advogado</option>
                </select>
                <select name="" id="">
                  <option value="">Cargo</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend>Virgência 02</legend>
            <div className="flex flex-col gap-4">
              <div className="flex flex-row gap-4">
                <input
                  type="date"
                  name="dateFirst"
                  id="dateFirst"
                  placeholder="Data Inicial"
                />
                <input
                  type="date"
                  name="dateLast"
                  id="dateLast"
                  placeholder="Data Final"
                />
                <button>Adicionar Representante</button>
              </div>

              <div className="flex flex-row gap-4">
                <select name="" id="">
                  <option value="">Representante</option>
                </select>
                <select name="" id="">
                  <option value="">Cargo</option>
                </select>
              </div>
              <div className="flex flex-row gap-4">
                <select name="" id="">
                  <option value="">Advogado</option>
                </select>
                <select name="" id="">
                  <option value="">Cargo</option>
                </select>
              </div>
            </div>
          </fieldset>
        </form>
    </div>
  );
}
