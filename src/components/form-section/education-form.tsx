import React, { useState } from "react";

export function EducationForm({ cvData, setCvData }: any) {
  const [school, setSchool] = useState("");
  const [level, setLevel] = useState("");

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, { school, level }],
    });
    setSchool("");
    setLevel("");
  };

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
