"use client";

import { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { CVPageProps, EducationItem } from "@/types/cv-type";

interface EducationDialogProps {
 cvData: CVPageProps
 id:string
 setEducationData:({id, education_level, school_name, school_address, date_in, date_out}: EducationItem)=> void
}

function formatDateForInput(date: string | Date | null | undefined): string {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
}

export function EducationDialog({ cvData, id, setEducationData }:EducationDialogProps) {
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");
  const [address, setAddress] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const edu = cvData.education.find((e:any) => e.id === id);
    if(!edu) return
        setSchool(edu.school_name)
        setLevel(edu.education_level)
        setAddress(edu.school_address)
        setDateIn(formatDateForInput(edu.date_in));
        setDateOut(formatDateForInput(edu.date_out));
  },[])

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/educations/${id}`, {
        education_level: level,
        school_name: school,
        school_address: address,
        date_in: new Date(dateIn),
        date_out: new Date(dateOut),
      });

      setEducationData(res.data)
     
    } catch (err) {
      console.error("Error save education", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <DialogContent className="max-w-md">
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
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
            </Button>
        </DialogFooter>
      </DialogContent>
  );
}
