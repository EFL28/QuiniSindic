"use client";
import React, { use } from "react";
import Image from "next/image";
import quinisindic from "@/public/quinisindic-noBG.png";
import Link from "next/link";
import Avvvatars from "avvvatars-react";
import { useEffect } from "react";
import axios from "axios";

export default function Header() {
  const [nickname, setNickname] = React.useState("");

  useEffect(() => {
    fetch("/api/users/getUser", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setNickname(data.user);
      });
  }, []);

  const handleLogout = async () => {
    const url = "/api/auth/logout";
    const response = await axios.post(url);

    if (response.status === 200) {
      window.location.href = "/";
    }

  }

  const toggleMenu = () => {
    // const menu = document.querySelector(".menu");
    // menu.classList.toggle("hidden");
  }

  return (
    <>
      <div className="w-full h-20 bg-[#7e2eb2] sticky top-0">
        <div className="container mx-auto px-4 md:px-2 lg:px-1 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="menu md:hidden cursor-pointer" onClick={toggleMenu}>
              {/* Mejorar esto */}
              <svg
                data-testid="geist-icon"
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
                style={{ color: "white" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1 2H1.75H14.25H15V3.5H14.25H1.75H1V2ZM1 12.5H1.75H14.25H15V14H14.25H1.75H1V12.5ZM1.75 7.25H1V8.75H1.75H14.25H15V7.25H14.25H1.75Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>

            <Link href="/home">
              <Image
                src={quinisindic}
                alt="QuiniSindic"
                width={70}
                height={70}
                className="rounded-full"
              />
            </Link>

            <Link href="/home">
              <div className="hidden md:flex gap-x-6 text-white text-xl font-bold">
                QuiniSindic
              </div>
            </Link>

            <div className="flex flex-row items-center">
              <Avvvatars value={nickname} shadow={true} size={50} />
              <div className="hidden lg:block justify-center ml-4 text-white">
                {nickname}
              </div>
            </div>
            <div className="cursor-pointer" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </div>
      {/* <Navbar /> */}
    </>
  );
}
