"use client";

import Navbar from "@/components/Navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CVCard from "@/components/cv-card";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white px-6 py-12 flex flex-col items-center">
        {/* Judul Utama */}

        <h1 className="text-3xl mb-3 mt-20 sm:text-4xl font-bold text-gray-800 max-w-2xl leading-tight">
          Viziaa-app <br />
        </h1>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 max-w-2xl leading-tight">
          CV Builder & Platform Persiapan Karier
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl text-center mt-4 leading-relaxed">
          Viziaa-App membantu Anda membuat CV ATS-friendly, mempersiapkan diri
          untuk wawancara, dan mengakses lowongan pekerjaan terbaik dalam satu
          platform modern.
        </p>

        {/* Fitur Utama */}
        <section className="mt-12 grid md:grid-cols-3 gap-6 max-w-5xl w-full">
          <Card className="border-blue-100 shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-blue-600">Pembuatan Resume</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Buat resume profesional dalam hitungan menit dengan template yang
              sudah dioptimalkan untuk ATS.
            </CardContent>
          </Card>

          <Card className="border-blue-100 shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-blue-600">Latihan Wawancara</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Siapkan diri menghadapi wawancara dengan simulasi interaktif
              langsung di platform.
            </CardContent>
          </Card>

          <Card className="border-blue-100 shadow-md hover:shadow-lg transition">
            <CardHeader>
              <CardTitle className="text-blue-600">Portal Lowongan</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-600">
              Akses lowongan pekerjaan dari berbagai industri dengan filter
              cerdas sesuai keahlian Anda.
            </CardContent>
          </Card>
        </section>
        {/* Tombol Navigasi */}
        <div className="mt-12">
          <Button
            size="lg"
            onClick={() => (window.location.href = "/")}
            className="px-8 py-3 text-white font-semibold rounded-md shadow-md"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </main>
    </>
  );
}
