import api from "@/services/api";
import { EducationProps } from "@/types/cv-type";
import React, { useEffect, useState } from "react";

export function EducationForm({ cvData, setEducationData, setCvData }: EducationProps) {
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");
  const [address, setAddress] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");
  const [errorMsg, setErrorMsg] = useState("")
  

  const addEducation = () => {
    try{
      const fetchNewEducation = async ()=>{
      const res = await api .post(`/educations/${cvData.id}`, {education_level:level, school_name:school, school_address:address, date_in:new Date(dateIn), date_out: new Date(dateOut) })
      console.log(res)
      setEducationData({
        id:res.data.id ,education_level:level, school_name:school, school_address:address, date_in:new Date(dateIn), date_out: new Date(dateOut) 
      })};
      fetchNewEducation()
      setSchool("");
      setLevel("");
      setAddress("")
      setDateIn("");
      setDateOut("")
    } catch (err: any) {
      console.error("Fetch Data Skill error", err);
      setErrorMsg(err.response?.data?.message || "Gagal fecth data");
    }
    
  };

    useEffect(() => {
      setCvData((prev) => {
        // kalau belum ada education → buat baru
        if (!prev.education.some((edu) => edu.isDraft)) {
          return {
            ...prev,
            education: [
              ...prev.education,
              { id:"0", education_level:level, school_name:school, school_address:address, date_in:new Date(dateIn), date_out: new Date(dateOut), isDraft:true }],
          };
        }
  
        // kalau sudah ada → ganti data terakhir
        const updated = [...prev.education];
        updated[updated.length - 1] = { id:"0", education_level:level, school_name:school, school_address:address, date_in:new Date(dateIn), date_out: new Date(dateOut), isDraft:true };
  
        return {
          ...prev,
          education: updated,
        };
      });
    }, [school, level, address, dateIn, dateOut]);

  return (
    <div className="p-4 border rounded-xl shadow-sm shadow-blue-300">
      <h3 className="font-semibold text-blue-700">Pendidikan</h3>
      <select
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
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
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alamat Sekolah"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
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
        onClick={addEducation}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Tambah
      </button>
    </div>
  );
}
