"use client";
import api from "@/services/api";
import { CVPageProps } from "@/types/cv-type";
import { useEffect, useState } from "react";
import { CVPreview1, CVPreview2, CVPreview3 } from "./cv-preview";
import { CVToolbar } from "./cv-toolbar";
import CvStepper from "./form-section/form-trigger";

type CVProps = {
  cv_id: string;
};

export default function CVPage({ cv_id }: CVProps) {
  const [cvData, setCvData] = useState<CVPageProps>({
    id: cv_id,
    name: "Nama Anda",
    font: "",
    color: "#d51a52",
    desain: 1,
    user: {
      id: "0",
      email: "",
      nickname: "",
      fullname: "",
      address: "",
      city: "",
      region: "",
      birthdate: new Date(),
      phone: "",
      about: "",
      avatar: "",
    },
    education: [],
    work_experiences: [],
    skills: [],
    additions: [],
  });

  const renderCVPreview = () => {
    switch (cvData.desain) {
      case 1:
        return (
          <CVPreview1
            cvData={cvData}
            setCvData={setCvData}
            onTrigger={onTrigger}
          />
        );
      case 2:
        return (
          <CVPreview2
            cvData={cvData}
            setCvData={setCvData}
            onTrigger={onTrigger}
          />
        );

      case 3:
        return (
          <CVPreview3
            cvData={cvData}
            setCvData={setCvData}
            onTrigger={onTrigger}
          />
        );
      // kalau ada desain tambahan
      // case 3: return <CVPreview3 ... />
      default:
        return (
          <CVPreview1
            cvData={cvData}
            setCvData={setCvData}
            onTrigger={onTrigger}
          />
        );
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get("/user");
      const user = res.data;

      if (user && user.cv && user.cv.length > 0) {
        const selectedCv = user.cv.find((cv: CVPageProps) => cv.id === cv_id);

        setCvData({
          ...cvData,
          id: selectedCv.id || cvData.id,
          name: selectedCv.name || cvData.name,
          font: selectedCv.font || cvData.font,
          color: selectedCv.color || cvData.color,
          desain: selectedCv.desain ?? cvData.desain,
          user: user,
          education: selectedCv.education || [],
          work_experiences: selectedCv.work_experiences || [],
          skills: selectedCv.skills || [],
          additions: selectedCv.additions || [],
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  function onTrigger(text: string) {
    fetchUser();
    alert(text);
  }
  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-white min-h-screen">
      {/* Kiri: Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-800">Isi Data CV</h2>
        <CvStepper
          cvData={cvData}
          setCvData={setCvData}
          onTrigger={onTrigger}
        />
      </div>

      {/* Kanan: Preview */}
      <div className="flex flex-col space-y-4">
        <CVToolbar cvData={cvData} setCvData={setCvData} />
        {renderCVPreview()}
      </div>
    </div>
  );
}
