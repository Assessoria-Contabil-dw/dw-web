export default function SignIn() {
  return (
    <div className="flex w-screen h-screen bg-zinc-50 justify-center items-center">
      <div className="flex flex-col items-center gap-8 w-72">
        <div>
          <h1>Login</h1>
        </div>
        <div className="flex flex-col gap-4 w-full">
        <label className="flex flex-col gap-1 text-sm font-semibold">
        E-mail
        <input
            type="text"
            name="email"
            id="email"
            placeholder="Digite seu e-mail"
          />
      </label>
      <label className="flex flex-col gap-1 text-sm font-semibold">
        Senha
        <input
            type="password"
            name="password"
            id="password"
            placeholder="Digite sua senha"
          />
      </label>
        </div>
        <button className="bg-primary hover:bg-primary-hover text-white ">
          Entrar
        </button>
      </div>
    </div>
  );
}
