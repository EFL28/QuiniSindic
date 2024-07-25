"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import quinisindic from "@/public/quinisindic-noBG.png";
import Link from "next/link";
import Avvvatars from "avvvatars-react";
import axios from "axios";

export default function Header() {
  const [nickname, setNickname] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  let lastScrollY = 0;

  useEffect(() => {
    fetch("/api/users/getUser", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setNickname(data.user);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsScrollingUp(false);
      } else {
        setIsScrollingUp(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    const url = "/api/auth/logout";
    const response = await axios.post(url);

    if (response.status === 200) {
      window.location.href = "/";
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <div className={`w-full h-14 bg-[#7e2eb2] fixed top-0 z-50 transition-transform duration-300 ${isScrollingUp ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto px-4 md:px-2 lg:px-1 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex-1 flex justify-start">
              <Link href="/home" className="flex items-center">
                <Image
                  src={quinisindic}
                  alt="QuiniSindic"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              </Link>
            </div>
            
            <Link href="/home" className="absolute left-1/2 transform -translate-x-1/2">
              <div className="hidden md:flex gap-x-6 text-white text-xl font-bold">
                QuiniSindic
              </div>
            </Link>

            <div className="flex items-center relative">
              <div onClick={toggleDropdown} className="cursor-pointer">
                <Avvvatars value={nickname} shadow={true} size={40} />
              </div>
              {dropdownVisible && (
                <div className="absolute top-12 right-0 bg-light dark:bg-[#310952] dark:text-white text-black rounded shadow-lg py-2">
                  <div className="px-4 py-2 cursor-pointer" onClick={handleLogout}>
                    Logout
                  </div>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </div>
      <div className="h-14" /> {/* Placeholder to prevent content from being hidden behind the header */}
    </>
  );
}
