"use client";

import { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { CVPageProps, EducationItem } from "@/types/cv-type";

interface SkillDialogProps {
 cvData: CVPageProps
 id:string
 setSkillData:({id, education_level, school_name, school_address, date_in, date_out}: EducationItem)=> void
}

export function EducationDialog({ cvData, id, setSkillData }:SkillDialogProps) {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [certificate, setCertificate] = useState("");
  const [certified, setCertified]= useState(false)
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const skill = cvData.skills.find((e:any) => e.id === id);
    if(!skill) return
        setSkill(skill.skill_name)
        setLevel(skill.ability_level)
        setCertificate(skill.certificate)
        setCertified(skill.certified)
  },[])

  const handleSave = async () => {
    try {
      if(certificate) {
          setCertified(true)
        } else {
          setCertified(false)
        }
      setLoading(true);
      const res = await api.put(`/skill/${id}/edit`, {
        skill_name: skill,
        ability_level: level,
        certificate: certificate,
        certified: certified,
      });
      setSkillData(res.data)
     
    } catch (err) {
      console.error("Error save skill", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit data Skill</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
        <input
            type="text"
            placeholder="Nama Skill"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
        />
        <select
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
        >
            <option value="">Seberapa Kamu Menguasai Skillmu ?</option>
            <option value="dasar">Dasar</option>
            <option value="menengah">Menengah</option>
            <option value="mahir">Mahir</option>
        </select>
        <input
            type="text"
            placeholder="Link Sertifikat (http:XXXXXXXXX)"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={certificate}
            onChange={(e) => setCertificate(e.target.value)}
        />
          
        </div>
         
          
        <DialogFooter>
          <Button onClick={handleSave} disabled={loading}>
            {loading ? "Menyimpan..." : "Simpan"}
            </Button>
        </DialogFooter>
      </DialogContent>
  );
}
