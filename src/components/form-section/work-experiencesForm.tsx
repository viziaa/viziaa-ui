import React, { useEffect, useState } from "react";

export function WorkExperienceForm({ cvData, setCvData, setExperiencesData }: any) {
  const [corporate, setCorporate] = useState("");
  const [dateIn, setDateIn] = useState("");
  const [dateOut, setDateOut] = useState("");

  const addWork = () => {
    setExperiencesData({
      corporate, date_in: dateIn, date_out: dateOut 
    });
    setCorporate("");
    setDateIn("");
    setDateOut("");
  };

  useEffect(() => {
           if (corporate.length === 0 && dateIn.length===0 && dateOut.length===0) return;
          setCvData((prev: any) => {
            // kalau belum ada work experiences → buat baru
            if (!prev.work_experiences || prev.work_experiences.length === 0) {
              return {
                ...prev,
                work_experiences: [{ corporate, date_in: dateIn, date_out: dateOut  }],
              };
            }
      
            // kalau sudah ada → ganti data terakhir
            const updated = [...prev.work_experiences];
            updated[updated.length - 1] = { corporate, date_in: dateIn, date_out: dateOut  };
      
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
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Tambah
      </button>
    </div>
  );
}
