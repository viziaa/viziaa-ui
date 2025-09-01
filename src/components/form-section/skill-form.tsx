import api from "@/services/api";
import { SkillProps } from "@/types/cv-type";
import React, { useEffect, useState } from "react";

export function SkillsForm({ cvData, setCvData, setSkillData }: SkillProps) {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [certificate, setCertificate] = useState("");
  const [certified, setCertified]= useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const addSkill = () => {
    try{
       if(certificate) {
          setCertified(true)
        } else {
          setCertified(false)
        }
    const fetchNewSkill = async ()=>{
    const res = await api.post(`/skill/${cvData.id}`, {skill_name: skill, ability_level: level, certificate})
    console.log(res)
    setSkillData({
       id:res.data.id, skill_name: skill, ability_level: level, certificate, certified}) 
    };
    fetchNewSkill()
    setSkill("");
    setLevel("");
    setCertified(false);
    } catch (err: any) {
      console.error("Fetch Data Skill error", err);
      setErrorMsg(err.response?.data?.message || "Gagal fecth data");
    }
  };

  useEffect(() => {
        if(certificate) {
          setCertified(true)
        } else {
          setCertified(false)
        }
        setCvData((prev) => {
          // kalau belum ada skills → buat baru
          if (!prev.skills.some((skill) => skill.isDraft)) {
            return {
              ...prev,
              skills: [
                ...prev.skills,
                {id:"0", skill_name: skill, ability_level: level, certificate, certified, isDraft:true}],
            };
          }
    
          // kalau sudah ada → ganti data terakhir
          const updated = [...prev.skills];
          updated[updated.length - 1] = { id:"0", skill_name: skill, ability_level: level, certificate, certified, isDraft:true};
    
          return {
            ...prev,
            skills: updated,
          };
        });
      }, [skill, level]);

  return (
    <div className="p-4 border rounded-xl shadow-sm shadow-blue-300">
      <h3 className="font-semibold text-blue-700">Skills</h3>
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
      <button
        onClick={addSkill}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
      >
        Tambah
      </button>
    </div>
  );
}
