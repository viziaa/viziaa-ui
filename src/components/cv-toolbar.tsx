import React from "react";

export function CVToolbar({ cvData, setCvData }: any) {
  return (
    <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl shadow !border">
      <div className="space-x-2 flex items-center">
        <label className="font-semibold text-blue-700">Font:</label>
        <select
          className="border p-1 rounded text-black"
          value={cvData.font}
          onChange={(e) => setCvData({ ...cvData, font: e.target.value })}
        >
          <option value="sans-serif">Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Mono</option>
        </select>
        <label className="font-semibold text-blue-700 ml-2">Warna:</label>
        <input
          type="color"
          value={cvData.color}
          onChange={(e) => setCvData({ ...cvData, color: e.target.value })}
        />
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
        Unduh PDF
      </button>
    </div>
  );
}
