"use client";
import api from "@/services/api";
import { useEffect, useRef } from "react";
import Swal from "sweetalert2";

export function CVToolbar({ cvData, setCvData }: any) {
  const isFirstRender = useRef(true);
  useEffect(()=>{
    if (isFirstRender.current) {
      isFirstRender.current = false; // skip eksekusi pertama
      return;
    }
     if (!cvData?.id || !cvData.color || !cvData.font || !cvData.desain) {
    return;
  }
    setTimeout(async()=>{
      await api.put(`/cv/${cvData.id}`, {color:cvData.color, font: cvData.font, desain:cvData.desain})
    },500)
  },[cvData.font, cvData.color, cvData.desain])
  const handleDownload = async () => {
    try {
      // tampilkan loading
      Swal.fire({
        title: "Sedang mengunduh...",
        text: "Mohon tunggu beberapa saat",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // hit endpoint backend download pdf
      const res = await api.get(`/cv/export/${cvData.id}`, {
        responseType: "blob", // penting untuk dapat file binary
        withCredentials: true, // biar cookie terkirim
      });

      // buat blob dari response
      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // bikin link download
      const a = document.createElement("a");
      a.href = url;
      a.download = `cv-${cvData.id}.pdf`;
      document.body.appendChild(a);
      a.click();

      // cleanup
      a.remove();
      window.URL.revokeObjectURL(url);

      // tutup loading
      Swal.close();

      // notifikasi sukses
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "CV berhasil diunduh!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.close();
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Gagal mengunduh CV. Silakan coba lagi.",
      });
      console.error("Gagal mengunduh PDF:", err);
    }
  };

  return (
    <div className="flex flex-row sm:flex-row items-center justify-between bg-indigo-50 p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 !border border-indigo-200 gap-3 sm:gap-0">
      <div className="flex flex-row sm:flex-row items-center gap-2 sm:gap-3 w-full sm:w-auto">
        <div className="flex flex-row sm:flex-row items-center gap-1 sm:gap-2 sm:w-30">
          <label className="hidden  sm:inline-block font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-300 text-sm sm:text-base">Font:</label>
          <select
            className="border border-indigo-300 p-2 rounded-lg text-black hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base w-full sm:30"
            value={cvData.font}
            onChange={(e) => setCvData({ ...cvData, font: e.target.value })}
          >
            <option value="sans-serif">Sans</option>
            <option value="serif">Serif</option>
            <option value="monospace">Mono</option>
            <option value="cursive">Cursive</option>
            <option value="fantasy">Fantasy</option>
            <option value="system-ui">System UI</option>

            {/* UI Fonts */}
            <option value="ui-serif">UI Serif</option>
            <option value="ui-sans-serif">UI Sans Serif</option>
            <option value="ui-monospace">UI Monospace</option>
            <option value="ui-rounded">UI Rounded</option>

            {/* Special */}
            <option value="emoji">Emoji</option>
            <option value="math">Math</option>
            <option value="fangsong">Fangsong</option>

            {/* Global values */}
            <option value="inherit">Inherit</option>
            <option value="initial">Initial</option>
            <option value="revert">Revert</option>
            <option value="revert-layer">Revert Layer</option>
            <option value="unset">Unset</option>
          </select>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
          <label className=" hidden sm:inline-block font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-300 text-sm sm:text-base">Warna:</label>
          <input
            type="color"
            value={cvData.color}
            onChange={(e) => setCvData({ ...cvData, color: e.target.value })}
            className="hover:scale-110 transition-transform duration-300 w-10 h-8 sm:w-12 sm:h-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 w-30">
          <label className="hidden sm:inline-block font-semibold text-indigo-700 hover:text-indigo-900 transition-colors duration-300 text-sm sm:text-base">Desain:</label>
          <select
            className="border border-indigo-300 p-2 rounded-lg text-black hover:border-indigo-500 focus:ring-2 focus:ring-indigo-500 transition-all duration-200 text-sm sm:text-base w-full sm:w-auto"
            value={cvData.desain}
            onChange={(e) => setCvData({ ...cvData, desain: Number(e.target.value) })}
          >
            <option value="1">Desain 1</option>
            <option value="2">Desain 2</option>
            <option value="3">Desain 3</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="bg-indigo-600 text-white px-1 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-indigo-700 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm sm:text-base w-full sm:w-auto"
      >
        Unduh PDF
      </button>
    </div>
  );
}
