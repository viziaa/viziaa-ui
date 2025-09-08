import { formatDMY, formatYear, formatDuration } from "@/lib/date";
import api from "@/services/api";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { EducationDeleteDialog } from "./FormDelete/education-delete";
import { EducationDialog } from "./formEdit-section/education-edit";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { UserDialog } from "./formEdit-section/user-edit";
import { SkillDialog } from "./formEdit-section/skill-edit";
import { SkillDeleteDialog } from "./FormDelete/skill-delete";
import { ExperienceDeleteDialog } from "./FormDelete/experience-edit";
import { ExperienceDialog } from "./formEdit-section/experience-edit";

interface User {
  id: string;
  fullname?: string;
  email: string;
  phone_number: number;
  address: string;
  city: string;
  region: string;
  about: string;
  birthdate: string;
}

export function CVPreview1({ cvData }: any) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const Aresponse = await api.get("/user");
        setUser(Aresponse.data); // Simpan objek user
      } catch (error) {
        console.error("Error fetching CV data:", error);
        setUser(null);
      }
    };

    fetchCV();
  }, []);

  return (
    <div className="p-8 bg-white rounded-xl shadow-lg w-full max-w-7xl mx-auto">
      <div className="flex items-center gap-6 border-b pb-6 mb-6">
        <img
          src={
            cvData.photo ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div>
          <h1 className="text-2xl font-serif">{cvData.user.fullname}</h1>
          <p className="text-gray-600">
            {cvData.user.phone_number} | {cvData.user.email}
          </p>
          <p className="font-medium mt-1">
            {cvData.user.address}, {cvData.user.city}, {cvData.user.region}
          </p>
        </div>
      </div>
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Tentang Saya</h2>
        <p className="text-gray-700 leading-relaxed">{cvData.user.about}</p>
      </section>
      {/* Pendidikan */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Pendidikan</h2>
        <ul className="space-y-2">
          {cvData.education.map((edu: any, i: number) => (
            <li key={i} className="text-gray-800 font-medium">
              {edu.date_in} - {edu.date_out} | {edu.school}
            </li>
          ))}
        </ul>
      </section>
      {/* Pengalaman Kerja */}
      <section className="mb-6">
        <h2 className="text-lg font-bold border-b pb-1 mb-2">
          Pengalaman Kerja
        </h2>
        <ul className="space-y-2">
          {cvData.work_experiences.map((work: any, i: number) => (
            <li key={i} className="text-gray-800 font-medium">
              {work.date_in} - {work.date_out} | {work.corporate}
            </li>
          ))}
        </ul>
      </section>
      {/* Kemampuan */}
      <section>
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Kemampuan</h2>
        <ul className="space-y-1 list-disc list-inside">
          {cvData.skills.map((s: any, i: number) => (
            <li key={i} className="text-gray-800">
              {s.skill_name} | {s.ability_level} ⭐
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function CVPreview2({
  cvData,
  setCvData,
  onTrigger,
}: any) {
  return (
    <div
      id="cv-root"
      style={{
        fontFamily: cvData.font || "sans-serif",
        color: "#d51a52", // default gray-800
      }}
      className={`w-full mx-auto bg-white overflow-hidden`}
    >
      {/* Header */}
      <div
        className="bg-blue-900 text-white p-8 flex  justify-between items-center"
        style={{ backgroundColor: cvData.color || "#000000" }}
      >
        <div>
          <h1 className="text-3xl font-extrabold">{cvData.user.fullname}</h1>
        </div>
        <img
          src={
            cvData.user.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
        />
      </div>

      {/* Body */}
      <div className="p-8 space-y-6">
        {/* Data Pribadi */}
        <section className="group relative">
          <h2 className="text-blue-900 font-bold mb-2">DATA PRIBADI</h2>
          <div className="text-gray-800 space-y-1">
            <p>Nama: {cvData.user.fullname}</p>
            <p>
              Tanggal Lahir:
              {cvData.user.birthdate ? formatDMY(cvData.user.birthdate) : "-"}
            </p>
            <p>Alamat: {cvData.user.address}, {cvData.user.city}, {cvData.user.region}</p>
            <p>No. Handphone: {cvData.user.phone}</p>
            <p>Email: {cvData.user.email}</p>
          </div>
          <div className="hidden group-hover:flex gap-2 ml-4">
            <Dialog>
              <DialogTrigger className="cursor-pointer hover:bg-blue-300 hover:rounded hover:p-1">
                <Edit className="w-4 h-4" />
              </DialogTrigger>
              <UserDialog
                cvData={cvData}
                onTrigger={onTrigger}
              />
            </Dialog>
          </div>
        </section>

        {/* Tentang Saya */}
        <section className="group relative">
          <h2 className="text-blue-900 font-bold mb-2">TENTANG SAYA</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.user.about}</p>
          <div className="hidden group-hover:flex gap-2 ml-4">
            <Dialog>
              <DialogTrigger className="cursor-pointer hover:bg-blue-300 hover:rounded hover:p-1">
                <Edit className="w-4 h-4" />
              </DialogTrigger>
              <UserDialog
                cvData={cvData}
                onTrigger={onTrigger}
              />
            </Dialog>
          </div>
        </section>

        {/* Pendidikan */}
        {}
        <section>
          <h2 className="text-blue-900 font-bold mb-2">PENDIDIKAN</h2>
          <ul className="flex flex-col gap-1 list-disc list-inside text-gray-800">
            {cvData.education.map((edu: any, i: number) => (
              <li key={i} className="group relative">
                {edu.date_in &&
                  !isNaN(new Date(edu.date_in).getTime()) &&
                  formatYear(edu.date_in)}{" "}
                - {edu.date_out && formatYear(edu.date_out)} | |{" "}
                {edu.education_level}{edu.major && edu.major} {edu.school_name} {edu.school_address}
                <div className="hidden group-hover:flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger className="cursor-pointer hover:bg-blue-300 hover:rounded hover:p-1">
                      <Edit className="w-4 h-4" />
                    </DialogTrigger>
                    <EducationDialog
                      id={edu.id}
                      cvData={cvData}
                      onTrigger={onTrigger}
                    />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="cursor-pointer hover:bg-red-300 hover:rounded hover:p-1">
                        <Trash className="w-4 h-4 text-red-600" />
                      </button>
                    </DialogTrigger>

                    <EducationDeleteDialog
                      id={edu.id}
                      onDelete={(deletedId) => {
                        // ✅ update langsung state cvData pakai setCvData
                        setCvData((prev: any) => ({
                          ...prev,
                          education: prev.education.filter(
                            (item: any) => item.id !== deletedId
                          ),
                        }));
                      }}
                    />
                  </Dialog>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Keahlian */}
        <section>
          <h2 className="text-blue-900 font-bold mb-2">KEAHLIAN</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {cvData.skills.map((s: any, i: number) => (
              <li key={i} className="text-start group relative">
                {s.skill_name} | {s.ability_level}
                <div className="hidden group-hover:flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger className="cursor-pointer hover:bg-blue-300 hover:rounded hover:p-1">
                      <Edit className="w-4 h-4" />
                    </DialogTrigger>
                    <SkillDialog
                      id={s.id}
                      cvData={cvData}
                      onTrigger={onTrigger}
                    />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="cursor-pointer hover:bg-red-300 hover:rounded hover:p-1">
                        <Trash className="w-4 h-4 text-red-600" />
                      </button>
                    </DialogTrigger>

                    <SkillDeleteDialog
                      id={s.id}
                      onDelete={(deletedId) => {
                        // ✅ update langsung state cvData pakai setCvData
                        setCvData((prev: any) => ({
                          ...prev,
                          skills: prev.skills.filter(
                            (item: any) => item.id !== deletedId
                          ),
                        }));
                      }}
                    />
                  </Dialog>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Pengalaman Kerja */}
        <section>
          <h2 className="text-blue-900 font-bold mb-2">PENGALAMAN KERJA</h2>
          <ul className="text-gray-800 space-y-1">
            {cvData.work_experiences.map((work: any, i: number) => (
              <li key={i} className="text-start group relative flex flex-col">
                <div>
              {work.date_in &&
            !isNaN(new Date(work.date_in).getTime()) &&
            formatDuration(work.date_in, work.date_out)}{" "}
          | {work.corporate} - {work.position}
                </div>
                <div>
                  {work.jobdesk}
                </div>
                <div className="hidden group-hover:flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger className="cursor-pointer hover:bg-blue-300 hover:rounded hover:p-1">
                      <Edit className="w-4 h-4" />
                    </DialogTrigger>
                    <ExperienceDialog
                      cvData={cvData}
                      id={work.id}
                      onTrigger={onTrigger}
                    />
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="cursor-pointer hover:bg-red-300 hover:rounded hover:p-1">
                        <Trash className="w-4 h-4 text-red-600" />
                      </button>
                    </DialogTrigger>

                    <ExperienceDeleteDialog
                      id={work.id}
                      onDelete={(deletedId) => {
                        // ✅ update langsung state cvData pakai setCvData
                        setCvData((prev: any) => ({
                          ...prev,
                          work_experiences: prev.work_experiences.filter(
                            (item: any) => item.id !== deletedId
                          ),
                        }));
                      }}
                    />
                  </Dialog>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Tambahan */}
        <section>
          <h2 className="text-blue-900 font-bold mb-2">Tambahan</h2>
          <ul className="text-gray-800 space-y-1">
            {cvData.additions.map((addition: any, i: number) => (
              <li key={i}>
                {addition.question} - {addition.answer}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function CVPreview3({
  cvData,
  
  cvStyle,
}: any) {
  return (
    <div
      id="cv-root"
      style={{
        fontFamily: cvData.font || "Inter, sans-serif",
        color: "#1f2937",
      }}
      className={`w-full h-fit mx-auto bg-white shadow-lg rounded-xl overflow-hidden ${cvStyle}`}
    >
      {/* Header */}
      <div className="bg-gray-100 p-8 flex items-center gap-6 border-b">
        <img
          src={
            cvData.user.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {cvData.user.fullname}
          </h1>
          <p className="text-gray-600">{cvData.user.email}</p>
          <p className="text-gray-600">{cvData.user.phone}</p>
          <p className="text-gray-600">
            {cvData.user.city}, {cvData.user.region}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-3 gap-8 p-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Tentang Saya */}
          <section>
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-2">
              Tentang Saya
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {cvData.user.about}
            </p>
          </section>

          {/* Keahlian */}
          <section>
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-2">
              Keahlian
            </h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {cvData.skills.map((s: any, i: number) => (
                <li key={i} className="flex justify-between">
                  <span>{s.skill_name}</span>
                  <span className="text-gray-500">{s.ability_level}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tambahan */}
          <section>
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-2">
              Tambahan
            </h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {cvData.additions.map((addition: any, i: number) => (
                <li key={i}>
                  <span className="font-medium">{addition.question}:</span>{" "}
                  {addition.answer}
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Pendidikan */}
          <section>
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-2">
              Pendidikan
            </h2>
            <ul className="space-y-3">
              {cvData.education.map((edu: any, i: number) => (
                <li key={i} className="text-sm text-gray-700">
                  <div className="font-medium text-gray-900">
                    {edu.education_level} {edu.major && `- ${edu.major}`}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {edu.date_in && formatYear(edu.date_in)} -{" "}
                    {edu.date_out && formatYear(edu.date_out)}
                  </div>
                  <div>
                    {edu.school_name}, {edu.school_address}
                  </div>
                  
                </li>
              ))}
            </ul>
          </section>

          {/* Pengalaman Kerja */}
          <section>
            <h2 className="text-lg font-semibold text-blue-700 border-b pb-1 mb-2">
              Pengalaman Kerja
            </h2>
            <ul className="space-y-3">
              {cvData.work_experiences.map((work: any, i: number) => (
                <li key={i} className="text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">
                      {work.position} - {work.corporate}
                    </span>
                    <span className="text-xs text-gray-500">
                      {work.date_in &&
                        formatYear(work.date_in)} - 
                      {work.date_out && formatYear(work.date_out)}
                      | {work.date_in && work.date_out && formatDuration(work.date_in, work.date_out)}
                    </span>
                  </div>
                  <p className="text-gray-600">{work.jobdesk}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

