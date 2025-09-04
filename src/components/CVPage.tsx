"use client";
import api from "@/services/api";
import { CVPageProps } from "@/types/cv-type";
import { useEffect, useState } from "react";
import { CVPreview2 } from "./cv-preview";
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

  const [userData, setUserData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [experiencesData, setExperiencesData] = useState([]);
  const [skillData, setSkillData] = useState([]);
  const [additionData, setAdditionData] = useState([]);

  useEffect(() => {
    if (userData.length === 0) return;
    fetchUser();
    alert("berhasil simpan data user");
  }, [userData]);

  useEffect(() => {
    if (educationData.length === 0) return;
    fetchUser();
    alert("berhasil tambahkan data education");
  }, [educationData]);

  useEffect(() => {
    if (experiencesData.length === 0) return;
    fetchUser();
    alert("berhasil tambahkan data experience");
  }, [experiencesData]);

  useEffect(() => {
    if (skillData.length === 0) return;
    fetchUser();
    alert("berhasil tambahkan data skill");
  }, [skillData]);

  useEffect(() => {
    if (additionData.length === 0) return;
    fetchUser();
    alert("berhasil tambahkan data tambahan");
  }, [additionData]);

  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-white min-h-screen">
      {/* Kiri: Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-800">Isi Data CV</h2>
        <CvStepper
          cvData={cvData}
          setCvData={setCvData}
          setUserData={setUserData}
          setEducationData={setEducationData}
          setExperiencesData={setExperiencesData}
          setSkillData={setSkillData}
          setAdditionData={setAdditionData}
        />
      </div>

      {/* Kanan: Preview */}
      <div className="flex flex-col space-y-4">
        <CVToolbar cvData={cvData} setCvData={setCvData} />
        <CVPreview2
          cvStyle="rounded-xl shadow-lg"
          cvData={cvData}
          setCvData={setCvData}
          setEducationData={setEducationData}
        />
      </div>
    </div>
  );
}
