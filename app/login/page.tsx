'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/react";
import Modal from "react-modal";
import axios from "axios";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const customStyles = {
    content: {
      display: "block",
      padding: "10px",
      borderRadius: "10px",
      width: "90%",
      height: "90%",
      maxWidth: "400px",
      maxHeight: "400px",
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user, password }),
    });
    
    const data = await res.json();
    if (res.ok) {
      setUser("");
      setPassword("");
      setLoading(false);
      router.push("/home");
    } else {
      console.error("Error:", data.error);
      setLoading(false);
      setErrorModalIsOpen(true);
      setError(data.error);
    }
  };

  function getErrorMessage(error: string) {
    switch (error) {
      case "User not found":
        return "El usuario no existe";
      case "Password incorrect":
        return "La contraseña es incorrecta";
      default:
        return "Ha ocurrido un error";
    }
  }

  return (
    <div className="flex justify-center items-center flex-col h-screen bg-light dark:bg-dark dark:text-white">
      {loading ? (
        <>
          <div className="font-semibold text-2xl mb-4">
            Iniciando sesión en QuiniSindic
          </div>
          <Spinner />
        </>
      ) : (
        <>
          <div className="font-semibold text-2xl mb-4">
            Inicia sesión en QuiniSindic
          </div>
          <form
            onSubmit={handleSubmit}
            className="border border-primary p-4 rounded flex flex-col md:p-6 lg:p-6"
          >
            <div className="p-2 rounded flex flex-col">
              <label htmlFor="username" className="">
                Nombre de usuario o correo electrónico
              </label>
              <input
                className="rounded text-black p-2 w-72 focus:outline-none focus:ring focus:ring-primary"
                type="text"
                id="user"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Introduce tu nombre de usuario o email"
                required
              />
            </div>

            <div className="p-2 rounded flex flex-col">
              <label htmlFor="password" className="">
                Contraseña
              </label>
              <input
                className="rounded text-black p-2 w-72 focus:outline-none focus:ring focus:ring-primary"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Introduce tu contraseña"
                required
              />
            </div>

            {/* añade lo de ya tienes cuenta? inicia sesion */}
            <div className="flex items-center justify-center mt-2">
              <span>
                ¿No tienes una cuenta? <a className="text-primary" href="/signup">Regístrate</a>
              </span>
            </div>


            <div className="flex items-center justify-center mt-2">
              <button className="rounded bg-primary hover:bg-primary-hover p-2 w-40 text-white" type="submit">
                Iniciar sesión
              </button>
            </div>
          </form>
        </>
      )}

        {/* Modal error al registrar */}
        <Modal
          isOpen={errorModalIsOpen}
          onRequestClose={() => setErrorModalIsOpen(false)}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
          style={customStyles as ReactModal.Styles}
        >
          <div className="flex justify-center items-center flex-col h-full  bg-light dark:bg-dark dark:text-white">
            <div className="font-semibold text-lg mb-4">
              Ha ocurrido un error
            </div>
            <div className="font-semibold text-lg mb-4 text-center">
              {getErrorMessage(error)}
            </div>
            <div className="flex items-center justify-center mt-2">
              <button
                className="rounded bg-primary hover:bg-primary-hover p-2 w-40 text-white"
                onClick={() => setErrorModalIsOpen(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
    </div>
  );
}
