"use client";

import { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { CVPageProps, EducationItem } from "@/types/cv-type";

interface ExperienceDialogProps {
 cvData: CVPageProps
 id:string
 setExperienceData:({id, education_level, school_name, school_address, date_in, date_out}: EducationItem)=> void
}

export function EducationDialog({ cvData, id, setExperienceData }:ExperienceDialogProps) {
  const [corporate, setCorporate] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const exp = cvData.work_experiences.find((e) => e.id === id);
    if(!exp) return
        setCorporate(exp.corporate)
        setDateIn(new Date(exp.date_in).toISOString().split("T")[0])
        setDateOut(new Date(exp.date_out).toISOString().split("T")[0])
  },[])

  const handleSave = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/experiences/${id}`, {
        corporate: corporate,
        date_in: dateIn,
        date_out: dateOut,
      });

      setExperienceData(res.data)
     
    } catch (err) {
      console.error("Error save experience", err);
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
            <input
                type="text"
                placeholder="Nama Perusahaan"
                className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
                value={corporate}
                onChange={(e) => setCorporate(e.target.value)}
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
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
            </Button>
        </DialogFooter>
      </DialogContent>
  );
}
