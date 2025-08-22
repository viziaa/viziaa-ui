import React, { useEffect, useState } from "react";

export function EducationForm({ cvData, setEducationData, setCvData }: any) {
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");

  const addEducation = () => {
    setEducationData({
       school, level 
    });
    setSchool("");
    setLevel("");
  };

    useEffect(() => {
       if (school.length === 0 && level.length===0) return;
      setCvData((prev: any) => {
        // kalau belum ada education → buat baru
        if (!prev.education || prev.education.length === 0) {
          return {
            ...prev,
            education: [{ school, level }],
          };
        }
  
        // kalau sudah ada → ganti data terakhir
        const updated = [...prev.education];
        updated[updated.length - 1] = { school, level };
  
        return {
          ...prev,
          education: updated,
        };
      });
    }, [school, level]);

  return (
    <div className="p-4 border rounded-xl shadow-sm shadow-blue-300">
      <h3 className="font-semibold text-blue-700">Pendidikan</h3>
      <input
        type="text"
        placeholder="Nama Sekolah"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={school}
        onChange={(e) => setSchool(e.target.value)}
      />
      <input
        type="text"
        placeholder="Jenjang"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <button
        onClick={addEducation}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Tambah
      </button>
    </div>
  );
}
