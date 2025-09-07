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
    setTimeout(async()=>{
      await api.put(`/cv/${cvData.id}`, {color:cvData.color, font: cvData.font, desain:cvData.desain})
    },600)
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
    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl shadow !border">
      <div className="space-x-2 flex items-center">
        <label className="font-semibold text-blue-700">Font:</label>
        <select
          className="border p-1 rounded text-black"
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

        <label className="font-semibold text-blue-700 ml-2">Warna:</label>
        <input
          type="color"
          value={cvData.color}
          onChange={(e) => setCvData({ ...cvData, color: e.target.value })}
        />
        <label className="font-semibold text-blue-700">Desain:</label>
        <select
          className="border p-1 rounded text-black"
          value={cvData.desain}
          onChange={(e) => setCvData({ ...cvData, desain: Number(e.target.value) })}
        >
          <option value="1">Desain 1</option>
          <option value="2">Desain 2</option>
          <option value="3">Desain 3</option>
        </select>
      </div>

      <button
        onClick={handleDownload}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
      >
        Unduh PDF
      </button>
    </div>
  );
}
