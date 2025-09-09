"use client";

import CVCard from "@/components/cv-card";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface User {
  id: string;
  fullname: string;
}

export default function HistoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [showDialog, setShowDialog] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const Aresponse = await api.get("/user");
        setUser(Aresponse.data); // Simpan objek user, bukan hanya cv
      } catch (error: any) {
        console.error("Error fetching CV data:", error);
        setUser(null);
        if (
          error.response?.data?.message === "Tidak ada session" ||
          "Gagal mendapatkan user"
        ) {
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

  const handleSubmit = async () => {
    try {
      await api.post("/cv", { name });
      setShowDialog(false);
      router.push("/history");
    } catch (error: any) {
      console.error("Error submitting CV:", error);
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
            }, 2000);
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
      <Navbar />
      <div className="px-4 sm:px-6 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              SELAMAT DATANG,{" "}
              <span className="text-indigo-600 hover:text-indigo-700 transition-colors duration-300 cursor-pointer">
                {user?.fullname}
              </span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Kelola dan buat CV profesional Anda dengan mudah
            </p>
          </div>

          {/* Create New CV Section */}
          <div onClick={() => setShowDialog(true)} className="bg-gradient-to-r cursor-pointer from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-[1.02]">
            <div className="text-center">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Buat CV Baru
                </h2>
                <p className="text-indigo-100 text-base sm:text-lg">
                  Mulai perjalanan karier Anda dengan CV yang ATS-friendly dan modern
                </p>
              </div>

              <div
                className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-indigo-600 font-bold text-base sm:text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/50"
              >
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create New Resume
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 rounded-xl transition-opacity duration-300"></div>
              </div>
            </div>
          </div>

          {/* CV History Section */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                Riwayat CV Anda
              </h3>
              <div className="text-xs sm:text-sm text-gray-500">
                Total: CV yang telah dibuat
              </div>
            </div>

            <CVCard />
          </div>
        </div>
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Masukkan Nama CV Anda</DialogTitle>
            <DialogDescription>
              Masukkan nama CV Anda memulai pembuatan CV baru.
            </DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama CV Anda"
            className="mt-4"
          />
          <DialogFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>Oke</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
