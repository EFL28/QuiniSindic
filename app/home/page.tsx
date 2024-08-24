"use client";
import Header from "../ui/header";
import Footer from "../ui/footer";
import Link from "next/link";
import { Button } from "@nextui-org/react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-light dark:bg-dark dark:text-white">
      <Header />
      <div className="flex flex-grow justify-center items-center flex-col text-xl">
        <Link href={"/quiniela"}>
          <div className="flex justify-center items-center h-32 w-64 rounded border border-black dark:border-white mb-4">
            Quiniela
          </div>
        </Link>
        <Link href={"/groupPrediction"}>
          <div className="flex justify-center items-center h-32 w-64 rounded border border-black dark:border-white mb-4">
            Predicciones de tu grupo
          </div>
        </Link>
      </div>
    {/* <Footer /> */}
    </div>
  );
}
