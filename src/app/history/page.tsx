"use client";

import CVCard from "@/components/cv-card";
import Navbar from "@/components/Navbar";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface User {
  id: string;
  fullname: string;
}

export default function HistoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const Aresponse = await api.get("/user");
        setUser(Aresponse.data); // Simpan objek user, bukan hanya cv
      } catch (error: any) {
        console.error("Error fetching CV data:", error);
        setUser(null);
        if (error.response?.data?.message === "Tidak ada session") {
          Swal.fire({
            title: "Kamu belum login",
            text: "Mengalihkan ke halaman login...",
            icon: "warning",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
              setTimeout(() => {
                Swal.close();
                router.push("/auth/login");
              }, 2000); // delay 2 detik biar ada efek loading
            },
          });
        }
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
