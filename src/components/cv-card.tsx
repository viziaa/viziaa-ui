"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import Swal from "sweetalert2";
import "dayjs/locale/id";
import Link from "next/link";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.locale("id");

interface CVData {
  id: string;
  name: string;
  created_at: string;
  design?: string;
}

export default function CVCard() {
  const [cvList, setCvList] = useState<CVData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const response = await api.get("/user");
        setCvList(response.data?.cv ?? []);
      } catch (error) {
        console.error("Error fetching CV data:", error);
        setCvList([]);
      }
    };
    fetchCV();
  }, []);

  const handleDelete = async (cvId: string, cvName: string) => {
    const result = await Swal.fire({
      title: "Hapus CV?",
      text: `Apakah Anda yakin ingin menghapus CV "${cvName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/cv/${cvId}`);
        setCvList((prev) => prev.filter((cv) => cv.id !== cvId));

        Swal.fire("Terhapus!", `CV "${cvName}" berhasil dihapus.`, "success");
      } catch (error) {
        console.error("Error deleting CV:", error);
        Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus CV.", "error");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
      {cvList.length > 0 ? (
        cvList.map((cv) => (
          <div
            key={cv.id}
            className="border rounded-2xl p-4 shadow-sm relative w-60 text-center"
          >
            <Link href={`/cv/${cv.id}`}>
              <h2 className="font-bold text-lg mb-2 border-b pb-1">
                {cv.name}
              </h2>

              <img src="./viziaa.png" alt="" />
              <p className="font-semibold">
                Dibuat : {dayjs.utc(cv.created_at).local().fromNow()}
              </p>
            </Link>

            {cv.design && <p className="font-semibold">Desain : {cv.design}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                size="icon"
                className="bg-red-500 hover:bg-red-600 rounded-full -mr-7 -mb-5"
                onClick={() => handleDelete(cv.id, cv.name)}
              >
                <Trash2 className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center col-span-full">
          Tidak ada data CV.
        </p>
      )}
    </div>
  );
}
