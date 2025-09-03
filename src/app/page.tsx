"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function Home() {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

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
    <>
      <Navbar />
      <main className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-6 p-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 max-w-2xl leading-tight">
          CV Builder & Platform Persiapan Karier <br />
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl">
          Buat CV yang ATS friendly hingga latihan interview tanpa perlu
          berpindah-pindah website. Persiapkan semua kebutuhan karier kamu di CV
          Builder by Viziaa.
        </p>
        <Button onClick={() => setShowDialog(true)} className="mt-6 px-6 py-3">
          Create your resume
        </Button>

        {/* Ilustrasi */}
        <div className="mt-10 relative max-w-4xl w-full">
          <Image
            src="/bg.png"
            alt="Tampilan CV"
            width={1000}
            height={600}
            className="rounded-lg shadow-lg"
          />
          <div className="absolute top-4 left-4 bg-blue-100 text-blue-900 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
            <span className="font-semibold">Pembuatan Resume</span>
          </div>
          <div className="absolute bottom-4 left-4 bg-green-100 text-green-900 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
            <span className="font-semibold">Kursus Persiapan Karier</span>
          </div>
          <div className="absolute top-4 right-4 bg-pink-100 text-pink-900 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
            <span className="font-semibold">Portal Lowongan Pekerjaan</span>
          </div>
        </div>
      </main>

      {/* Dialog Input Nama */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Masukkan Nama Anda</DialogTitle>
          </DialogHeader>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Lengkap"
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
    </>
  );
}
