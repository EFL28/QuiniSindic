export default function SignUpPage() {
    return (
      <div className="flex justify-center items-center flex-col h-screen bg-light dark:bg-dark dark:text-white">
        <div className="font-semibold text-2xl mb-4">Regístrate en QuiniSindic</div>
        <form
          action=""
          className="border border-primary p-4 rounded flex flex-col md:p-6 lg:p-6"
        >
          <div className="p-2 rounded flex flex-col">
            <label htmlFor="username" className="">
              Nombre de usuario
            </label>
            <input
              className="rounded text-black p-2 w-72 focus:outline-none focus:ring focus:ring-primary"
              type="text"
              id="username"
              placeholder="Introduce tu nombre de usuario"
            />
          </div>
  
          <div className="p-2 rounded flex flex-col">
            <label htmlFor="email" className="">
              Correo electrónico
            </label>
            <input
              className="rounded text-black p-2 w-72 focus:outline-none focus:ring focus:ring-primary"
              type="email"
              id="email"
              placeholder="Introduce tu correo electrónico"
            />
          </div>
  
          <div className="p-2 rounded flex flex-col">
            <label htmlFor="password" className="">
              Correo electrónico
            </label>
            <input
              className="rounded text-black p-2 w-72 focus:outline-none focus:ring focus:ring-primary"
              type="password"
              id="password"
              placeholder="Introduce tu contraseña"
            />
          </div>
  
          <div className="flex items-center justify-center mt-2">
              <button className="rounded bg-primary hover:bg-primary-hover p-2 w-40 text-white">Regístrate</button>
          </div>
        </form>
      </div>
    );
  }
  