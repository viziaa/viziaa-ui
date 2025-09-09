"use client";
import api from "@/services/api";
import { CVPageProps } from "@/types/cv-type";
import { useEffect, useState } from "react";
import { CVPreview1, CVPreview2, CVPreview3 } from "./cv-preview";
import { CVToolbar } from "./cv-toolbar";
import CvStepper from "./form-section/form-trigger";
import Swal from "sweetalert2";

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
    Swal.fire({
      icon: "success",
      title: "Success",
      text: text,
      timer: 2000,
      showConfirmButton: false,
    });
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Kiri: Form */}
        <div className="space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 bg-white p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            Isi Data CV
          </h2>
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CvStepper
              cvData={cvData}
              setCvData={setCvData}
              onTrigger={onTrigger}
            />
          </div>
        </div>

        {/* Kanan: Preview */}
        <div className="flex flex-col space-y-4 sm:space-y-6">
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CVToolbar cvData={cvData} setCvData={setCvData} />
          </div>
          <div className="bg-white p-3 sm:p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            {renderCVPreview()}
          </div>
        </div>
      </div>
    </div>
  );
}
