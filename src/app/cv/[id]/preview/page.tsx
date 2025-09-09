"use client";
import { CVPreview2, CVPreview1, CVPreview3 } from "@/components/cv-preview";
import api from "@/services/api";
import { CVPageProps } from "@/types/cv-type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CVPage() {
  const params = useParams();
  const { id } = params;
  const [cvData, setCvData] = useState<CVPageProps>({
    id: id as string,
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

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await api.get("/user");
      const user = res.data;

      console.log(user);
      const selectedCv = user.cv.find((cv: CVPageProps) => cv.id === id);
      console.log(selectedCv);

      if (user && user.cv && user.cv.length > 0) {
        const selectedCv = user.cv.find((cv: CVPageProps) => cv.id === id);

        setCvData({
          ...cvData,
          id: selectedCv.id || cvData.id,
          name: selectedCv.name || cvData.name,
          font: selectedCv.font || cvData.font,
          color: selectedCv.color || cvData.color,
          desain: selectedCv.desain || cvData.desain,
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

    const onTrigger=(value:string)=>(value)

  return (
    <div className="bg-gray-100 flex items-center justify-center">
      {renderCVPreview()}
    </div>
  );
}
