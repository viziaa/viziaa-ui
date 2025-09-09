"use client";

import { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { EditDialogProps } from "@/types/cv-type";

export function ExperienceDialog({ cvData, id, onTrigger }:EditDialogProps) {
  const [corporate, setCorporate] = useState("");
  const [position, setPosition] = useState("");
  const [jobdesk, setJobdesk] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const exp = cvData.work_experiences.find((e) => e.id === id);
    if(!exp) return
        setCorporate(exp.corporate)
        setPosition(exp.position)
        setJobdesk(exp.jobdesk)
        if (exp.date_in) {
          const dateIn = new Date(exp.date_in);
          if (!isNaN(dateIn.getTime())) {
            setDateIn(dateIn.toISOString().split("T")[0]);
          }
        }

         if (exp.date_out) {
          const dateOut = new Date(exp.date_out);
          if (!isNaN(dateOut.getTime())) {
            setDateOut(dateOut.toISOString().split("T")[0]);
          }
        }
  },[])

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/experiences/${id}`, {
        corporate: corporate,
        position,
        jobdesk,
        date_in: dateIn,
        date_out: dateOut,
      });

      onTrigger(`berhasil edit data Pengalam Kerja ${res.data.data.corporate}`)
     
    } catch (err) {
      console.error("Error save experience", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Edit data Pengalaman Kerja</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
            <input
                type="text"
                placeholder="Nama Perusahaan"
                className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
                value={corporate}
                onChange={(e) => setCorporate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Jabatan Terakhir"
              className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <textarea
              placeholder="Job Desk"
              className="w-full p-2 mt-2 border text-black placeholder-gray-400 rounded"
              rows={3}   // ini bikin tinggi awal 3 baris
              value={jobdesk}
              onChange={(e) => setJobdesk(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
                <input
                    type="date"
                    className="w-1/2 p-2 border text-gray-400 hover:text-black rounded"
                    value={dateIn}
                    onChange={(e) => setDateIn(e.target.value)}
                />
                <input
                    type="date"
                    className="w-1/2 p-2 border text-gray-400 hover:text-black rounded"
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
