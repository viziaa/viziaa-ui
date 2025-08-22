"use client";

import CVCard from "@/components/cv-card";
import Navbar from "@/components/Navbar";
import api from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

interface User {
  id: string;
  fullname: string;
}

export default function HistoryPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const Aresponse = await api.get("/user");
        setUser(Aresponse.data); // Simpan objek user, bukan hanya cv
      } catch (error) {
        console.error("Error fetching CV data:", error);
        setUser(null);
      }
    };

    fetchCV();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <div className="px-6 py-4 text-2xl font-semibold">
        SELAMAT DATANG,{" "}
        <span className=" cursor-pointer text-blue">{user?.fullname}</span>
      </div>

      <CVCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-6 py-4"></div>
    </div>
  );
}
