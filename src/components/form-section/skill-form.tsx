import React, { useEffect, useState } from "react";

export function SkillsForm({ cvData, setCvData, setSkillData }: any) {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("");
  const [certified, setCertified] = useState(false);

  const addSkill = () => {
    setSkillData({
     skill_name: skill, ability_level: level, certified 
    });
    setSkill("");
    setLevel("");
    setCertified(false);
  };

  useEffect(() => {
         if (skill.length === 0 && level.length===0) return;
        setCvData((prev: any) => {
          // kalau belum ada skills → buat baru
          if (!prev.skills || prev.skills.length === 0) {
            return {
              ...prev,
              skills: [{ skill_name: skill, ability_level: level, certified }],
            };
          }
    
          // kalau sudah ada → ganti data terakhir
          const updated = [...prev.skills];
          updated[updated.length - 1] = { skill_name: skill, ability_level: level, certified };
    
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
      <input
        type="text"
        placeholder="Level (Beginner, Intermediate, Advanced)"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <label className="flex items-center text-gray-500 gap-2 mt-2">
        <input
          type="checkbox"
          checked={certified}
          onChange={(e) => setCertified(e.target.checked)}
        />
        <span>Bersertifikat</span>
      </label>
      <button
        onClick={addSkill}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Tambah
      </button>
    </div>
  );
}
