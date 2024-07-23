'use client';   
import { useState } from "react"

export default function HomePage() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    
    //     const res = await fetch("/api/login", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({ user, password }),
    //     });
    //   };


    return (
        <h1>Home</h1>
    )
}