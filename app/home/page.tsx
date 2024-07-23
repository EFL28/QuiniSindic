"use client";
import Header from "../ui/header";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-light dark:bg-dark dark:text-white">
      <Header />
      <div className="flex flex-grow justify-center items-center">
        <Link href={"/quiniela"}>
          <div className="flex justify-center items-center h-32 w-64 border border-black dark:border-white ">
            Quiniela
          </div>
        </Link>
      </div>
    </div>
  );
}
