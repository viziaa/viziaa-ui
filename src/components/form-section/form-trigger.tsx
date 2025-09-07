import React, { useState } from "react";
import { cn } from "@/lib/utils"; // helper optional kalau ada

// Import form components
import {EducationForm} from "./education-form";
import {WorkExperienceForm} from "./work-experiencesForm";
import {SkillsForm} from "./skill-form";
import {AdditionForm} from "./addition-form";
import { UserForm } from "./user-form";
import { FormProps } from "@/types/cv-type";

interface Step {
  id: number;
  label: string;
  component: React.ReactNode;
}

export default function CvStepper({ cvData, setCvData, onTrigger  }: FormProps) {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps: Step[] = [
    { id: 1, label: "Data Pribadi", component: <UserForm cvData={cvData} setCvData={setCvData} onTrigger={onTrigger} /> },
    { id: 2, label: "Pendidikan", component: <EducationForm cvData={cvData} setCvData={setCvData} onTrigger={onTrigger} /> },
    { id: 3, label: "Pengalaman Kerja", component: <WorkExperienceForm cvData={cvData} setCvData={setCvData} onTrigger={onTrigger}/> },
    { id: 4, label: "Skill", component: <SkillsForm cvData={cvData} setCvData={setCvData} onTrigger={onTrigger} /> },
    { id: 5, label: "Lainnya", component: <AdditionForm cvData={cvData}  onTrigger={onTrigger} setCvData={setCvData} /> },
    // { id: 4, label: "Organisasi", component: <WorkExperienceForm cvData={cvData} setCvData={setCvData} /> },
  ];
 
  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="relative flex flex-col items-center flex-1 cursor-pointer"
            onClick={() => setActiveStep(step.id)}
          >
            {/* Circle */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full z-10
                ${activeStep === step.id ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-700"}
              `}
            >
              {step.id}
            </div>
            {/* Label */}
            <span
              className={`mt-2 text-sm ${
                activeStep === step.id ? "text-blue-700 font-semibold" : "text-gray-500"
              }`}
            >
              {step.label}
            </span>

            {/* Garis Penghubung */}
            {index < steps.length - 1 && (
              <div className="absolute top-5 left-1/2 w-full h-0.5 bg-gray-300 -z-0">
                <div
                  className={`h-0.5 ${
                    activeStep > step.id ? "bg-blue-600" : "bg-gray-300"
                  }`}
                  style={{ width: "100%" }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <div className="p-4 border rounded-lg bg-white shadow">
        {steps.find((s) => s.id === activeStep)?.component}
      </div>
    </div>
  );
}
