import api from "@/services/api";
import { ExperienceItem, ExperienceProps } from "@/types/cv-type";
import React, { useEffect, useState } from "react";

export function WorkExperienceForm({ cvData, setCvData, setExperiencesData }: ExperienceProps) {
  const [corporate, setCorporate] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  const addWork = () => {
    try{
    const fetchNewWork = async ()=>{
    const res = await api.post(`/experiences/${cvData.id}`, {corporate, date_in: dateIn, date_out: dateOut })
    console.log(res)
    setExperiencesData({
       id:res.data.id, corporate, date_in: new Date(dateIn), date_out: new Date(dateOut)}) 
    };
    fetchNewWork()
    setCorporate("");
    setDateIn("");
    setDateOut("");
    } catch (err:any) {
      console.error("Fetch Data Work Experience error", err);
      setErrorMsg(err.response?.data?.message || "Gagal fecth data");
    }
  };

  useEffect(() => {
           
          setCvData((prev) => {
            // kalau belum ada work experiences → buat baru
            if (!prev.work_experiences.some((experience)=> experience.isDraft)) {
              return {
                ...prev,
                work_experiences: [
                  ...prev.work_experiences, {id:"0", corporate, date_in: new Date(dateIn), date_out: new Date(dateOut), isDraft:true}],
              };
            }
      
            // kalau sudah ada → ganti data terakhir
            const updated = [...prev.work_experiences];
            updated[updated.length - 1] = { id:"0", corporate, date_in: new Date(dateIn), date_out: new Date(dateOut), isDraft:true};
      
            return {
              ...prev,
              work_experiences: updated,
            };
          });
        }, [corporate, dateIn, dateOut]);

  return (
    <div className="p-4 border rounded-xl shadow-sm shadow-blue-300">
      <h3 className="font-semibold text-blue-700">Pengalaman Kerja</h3>
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
      <button
        onClick={addWork}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
      >
        Tambah
      </button>
    </div>
  );
}
