import React, { useState } from "react";

export function AdditionForm({ cvData, setCvData }: any) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const addAddition = () => {
    if (!question || !answer) return;
    setCvData({
      ...cvData,
      additions: [...cvData.additions, { question, answer }],
    });
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm shadow-blue-300">
      <h3 className="font-semibold text-blue-700">Tambahan</h3>
      <input
        type="text"
        placeholder="Pertanyaan (contoh: Hobi)"
        className="w-full p-2 mt-2 border  text-gray-400 hover:text-black rounded"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <input
        type="text"
        placeholder="Jawaban"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <button
        onClick={addAddition}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Tambah
      </button>
    </div>
  );
}
