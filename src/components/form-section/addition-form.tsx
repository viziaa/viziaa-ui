import React, { useEffect, useState } from "react";

export function AdditionForm({ cvData, setAdditionData, setCvData }: any) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const addAddition = () => {
    setAdditionData({
     question, answer,
    });
    setQuestion("");
    setAnswer("");
  };

  

  useEffect(() => {
     if (question.length === 0 && answer.length===0) return;
    setCvData((prev: any) => {
      // kalau belum ada additions → buat baru
      if (!prev.additions || prev.additions.length === 0) {
        return {
          ...prev,
          additions: [{ question, answer }],
        };
      }

      // kalau sudah ada → ganti data terakhir
      const updated = [...prev.additions];
      updated[updated.length - 1] = { question, answer };

      return {
        ...prev,
        additions: updated,
      };
    });
  }, [question, answer]);
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
