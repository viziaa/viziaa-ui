import React from "react";

export function CVPreview({ cvData }: any) {
  return (
    <div
      className="p-6 border rounded-2xl shadow-md bg-gray-50 h-full overflow-y-auto"
      style={{ fontFamily: cvData.font, color: cvData.color }}
    >
      <h1 className="text-2xl font-bold mb-4">{cvData.name}</h1>
      <h2 className="text-lg font-semibold">Pendidikan</h2>
      <ul className="list-disc ml-6">
        {cvData.education.map((e: any, i: number) => (
          <li key={i}>
            {e.level} - {e.school}
          </li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mt-4">Pengalaman Kerja</h2>
      <ul className="list-disc ml-6">
        {cvData.work_experiences.map((w: any, i: number) => (
          <li key={i}>{w.corporate} ({w.date_in} - {w.date_out})</li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mt-4">Skills</h2>
      <ul className="list-disc ml-6">
        {cvData.skills.map((s: any, i: number) => (
          <li key={i}>{s.skill_name} ({s.ability_level})</li>
        ))}
      </ul>
      <h2 className="text-lg font-semibold mt-4">Tambahan</h2>
        <ul className="list-disc ml-6">
        {cvData.additions.map((a: any, i: number) => (
            <li key={i}>
            <strong>{a.question}:</strong> {a.answer}
            </li>
        ))}
        </ul>
    </div>
  );
}
