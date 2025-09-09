"use client";

import { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { EditDialogProps } from "@/types/cv-type";



function formatDateForInput(date: string | Date | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}

export function EducationDialog({ cvData, id, onTrigger }: EditDialogProps) {
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");
  const [major, setMajor] = useState<string |null>("")
  const [address, setAddress] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const edu = cvData.education.find((e:any) => e.id === id);
    if(!edu) return
        setSchool(edu.school_name)
        setLevel(edu.education_level)
        setMajor(edu.major)
        setAddress(edu.school_address)
        setDateIn(formatDateForInput(edu.date_in));
        setDateOut(formatDateForInput(edu.date_out));
  },[cvData])

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/educations/${id}`, {
        education_level: level,
        school_name: school,
        major,
        school_address: address,
        date_in: new Date(dateIn),
        date_out: new Date(dateOut),
      });
      console.log(res.data)
      onTrigger(`Berhasil Edit Data Pendidikan ${res.data.data.education_level}`)
     
    } catch (err) {
      console.error("Error save education", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Edit data Pendidikan</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <select
                className="w-full p-2 mt-2 border text-black hover:text-black rounded"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
            >
                <option value="">Jenjang</option>
                <option value="Tidak Bersekolah">Tidak bersekolah</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="s1 / sarjana">S1 / Sarjana</option>
                <option value="s2 / magister">S2 / magister</option>
                <option value="s3 / doktor">S3 / doktor</option>
        </select>
          {["sma", "s1 / sarjana", "s2 / magister", "s3 / doktor"].includes(level?.toLowerCase())  &&
          <input
            type="text"
            placeholder="Jurusan"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={major ?? ""}
            onChange={(e) => setMajor(e.target.value)}
          />}
          <input
            type="text"
            placeholder="Nama Sekolah"
            className="w-full p-2 border rounded"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
          <input
            type="text"
            placeholder="Alamat Sekolah"
            className="w-full p-2 border rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-2">
            <input
              type="date"
              className="w-1/2 p-2 border rounded"
              value={dateIn}
              onChange={(e) => setDateIn(e.target.value)}
            />
            <input
              type="date"
              className="w-1/2 p-2 border rounded"
              value={dateOut}
              onChange={(e) => setDateOut(e.target.value)}
            />
          </div>
        </div>
         
          
        <DialogFooter>
           <DialogClose asChild>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
           </DialogClose>
        </DialogFooter>
      </DialogContent>
  );
}
