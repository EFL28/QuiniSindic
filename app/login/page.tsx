'use client';
import { redirect } from "next/dist/server/api-utils";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
  
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, password }),
      });
      
      const data = await res.json();
      // console.log("data:", data);
      if (res.ok) {
        // console.log("User registered:", data)
        router.push("/home");

        setUser("");
        setPassword("");
      } else {
        console.error("Error:", data.error);
      }

    };

    return (
      <div className="flex justify-center items-center flex-col h-screen bg-light dark:bg-dark dark:text-white">
        <div className="font-semibold text-2xl mb-4">
          Inicia sesión en QuiniSindic
        </div>
        <form
        onSubmit={handleSubmit}
          action=""
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
  
          <div className="flex items-center justify-center mt-2">
            <button className="rounded bg-primary hover:bg-primary-hover p-2 w-40 text-white" type="submit">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    );
  }