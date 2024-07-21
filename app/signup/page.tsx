"use client";

import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import Modal from "react-modal";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const customStyles = {
    content: {
      display: "block",
      backgroundColor: "white",
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

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("User registered:", data);
      openModal();
    } else {
      console.error("Error:", data.error);
    }

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col h-screen bg-light dark:bg-dark dark:text-white">
        <div className="font-semibold text-2xl mb-4">
          Regístrate en QuiniSindic
        </div>
        <form
          onSubmit={handleSubmit}
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Introduce tu nombre de usuario"
              required
              // aria-describedby="username-error"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Introduce tu correo electrónico"
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

          <div className="flex items-center justify-center mt-2">
            <button
              className="rounded bg-primary hover:bg-primary-hover p-2 w-40 text-white"
              type="submit"
            >
              Regístrate
            </button>
          </div>
        </form>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="Modal"
        overlayClassName="Overlay"
        ariaHideApp={false}
        style={customStyles}
      >
        <div className="flex justify-center items-center flex-col h-full  bg-light dark:bg-dark dark:text-white">
          <div className="font-semibold text-lg mb-4">
            Tu registro ha sido exitoso
          </div>
          <div className="font-semibold text-lg mb-4">
            ¡Ahora puedes iniciar sesión!
          </div>
          <div className="flex items-center justify-center mt-2">
            <button
              className="rounded bg-primary hover:bg-primary-hover p-2 w-40 text-white"
              onClick={() => router.push("/login")}
            >
              Iniciar sesión
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
