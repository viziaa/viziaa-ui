"use client";
import React, { useState } from "react";
import { EducationForm } from "./form-section/education-form";
import { WorkExperienceForm } from "./form-section/work-experiencesForm";
import { SkillsForm } from "./form-section/skill-form";
import { AdditionForm } from "./form-section/addition-form";
import { CVPreview } from "./cv-preview";
import { CVToolbar } from "./cv-toolbar";
import CvStepper from "./form-section/form-trigger";

export default function CVPage() {
  const [cvData, setCvData] = useState({
    name: "Nama Anda",
    font: "sans-serif",
    color: "#1E3A8A", // biru default
    education: [],
    work_experiences: [],
    skills: [],
    additions: [],
  });

  return (
    <div className="grid grid-cols-2 gap-4 p-6 bg-white min-h-screen">
      {/* Kiri: Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-800">Isi Data CV</h2>
        <CvStepper cvData={cvData} setCvData={setCvData}/>
      </div>

      {/* Kanan: Preview */}
      <div className="flex flex-col space-y-4">
        <CVToolbar cvData={cvData} setCvData={setCvData} />
        <CVPreview cvData={cvData} />
      </div>
    </div>
  );
}
