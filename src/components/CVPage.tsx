"use client";
import React, { useEffect, useState } from "react";
import { EducationForm } from "./form-section/education-form";
import { WorkExperienceForm } from "./form-section/work-experiencesForm";
import { SkillsForm } from "./form-section/skill-form";
import { AdditionForm } from "./form-section/addition-form";
import CVPreview2, { CVPreview } from "./cv-preview";
import { CVToolbar } from "./cv-toolbar";
import CvStepper from "./form-section/form-trigger";
import api from "@/services/api";



interface CV {
  id: string;
  name: string;
}




export default function CVPage() {
  const [cvData, setCvData] = useState<any>({
    name: "Nama Anda",
    font: "",
    color: "#000000", // biru default
    user:[],
    education: [],
    work_experiences: [],
    skills: [],
    additions: [],
  });

  console.log(cvData.color)
 useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user");
        const user = res.data;
        console.log(res.data)

        if (user && user.cv && user.cv.length > 0) {
          const selectedCv = user.cv[0]; // ambil cv pertama (atau sesuai kebutuhan)

          setCvData({
            ...cvData,
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

    fetchUser();
  }, []);
  console.log(cvData)
  const[userData, setUserData] = useState([])
  const[educationData, setEducationData] = useState([])
  const[experiencesData, setExperiencesData] = useState([])
  const[skillData, setSkillData] = useState([])
  const[additionData, setAdditionData] = useState([])

  useEffect(()=>{
     if (userData.length === 0) return;
    alert("berhasil fetch")
  },[userData])

  useEffect(()=>{
     if (educationData.length === 0) return;
    alert("berhasil fetch")
  },[educationData])

  useEffect(()=>{
     if (experiencesData.length === 0) return;
    alert("berhasil fetch")
  },[experiencesData])

  useEffect(()=>{
     if (skillData.length === 0) return;
    alert("berhasil fetch")
  },[skillData])

   useEffect(()=>{
     if (additionData.length === 0) return;
     alert("berhasil fetch")
  },[additionData])


  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-white min-h-screen">
      {/* Kiri: Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-800">Isi Data CV</h2>
        <CvStepper cvData={cvData} setCvData={setCvData} setUserData={setUserData} 
          setEducationData={setEducationData} setExperiencesData={setExperiencesData} 
          setSkillData={setSkillData} setAdditionData={setAdditionData}
         />
      </div>

      {/* Kanan: Preview */}
      <div className="flex flex-col space-y-4">
        <CVToolbar cvData={cvData} setCvData={setCvData}/>
        <CVPreview2 cvData={cvData} />
      </div>
    </div>
  );
}
