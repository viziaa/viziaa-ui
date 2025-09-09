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

export function CVPreview2({ cvData, setCvData, onTrigger }: any) {
  return (
    <div
      id="cv-root"
      style={{
        fontFamily: cvData.font || "sans-serif",
        color: "#d51a52", // default gray-800
      }}
      className={`w-full mx-auto bg-white overflow-hidden hover:shadow-2xl transition-all duration-300`}
    >
      {/* Header */}
      <div
        className="bg-indigo-900 text-white p-4 sm:p-6 lg:p-8 flex justify-between items-center hover:bg-indigo-800 transition-colors duration-300"
        style={{ backgroundColor: cvData.color || "#312e81" }}
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold hover:text-indigo-100 transition-colors duration-300">{cvData.user.fullname}</h1>
        </div>
        <img
          src={
            cvData.user.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s"
          }
          alt="Profile"
          className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-white object-cover shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
      </div>

      {/* Body */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
        {/* Data Pribadi */}
        <section className="group relative hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
          <h2 className="text-indigo-700 font-bold mb-2">DATA PRIBADI</h2>
          <div className="text-gray-800 space-y-1">
            <p>Nama: {cvData.user.fullname}</p>
            <p>
              Tanggal Lahir:
              {cvData.user.birthdate ? formatDMY(cvData.user.birthdate) : "-"}
            </p>
            <p>
              Alamat: {cvData.user.address}, {cvData.user.city},{" "}
              {cvData.user.region}
            </p>
            <p>No. Handphone: {cvData.user.phone}</p>
            <p>Email: {cvData.user.email}</p>
          </div>
          <div className="hidden group-hover:flex gap-2 ml-4">
            <Dialog>
              <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
                <Edit className="w-4 h-4" />
              </DialogTrigger>
              <UserDialog cvData={cvData} onTrigger={onTrigger} />
            </Dialog>
          </div>
        </section>

        {/* Tentang Saya */}
        <section className="group relative hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
          <h2 className="text-indigo-700 font-bold mb-2">TENTANG SAYA</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.user.about}</p>
          <div className="hidden group-hover:flex gap-2 ml-4">
            <Dialog>
              <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
                <Edit className="w-4 h-4" />
              </DialogTrigger>
              <UserDialog cvData={cvData} onTrigger={onTrigger} />
            </Dialog>
          </div>
        </section>

        {/* Pendidikan */}
        <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
          <h2 className="text-indigo-700 font-bold mb-2">PENDIDIKAN</h2>
          <ul className="flex flex-col gap-1 list-disc list-inside text-gray-800">
            {cvData.education.map((edu: any, i: number) => (
              <li key={i} className="group relative hover:text-indigo-800 transition-colors duration-300">
                {edu.date_in &&
                  !isNaN(new Date(edu.date_in).getTime()) &&
                  formatYear(edu.date_in)}{" "}
                - {edu.date_out && formatYear(edu.date_out)} | |{" "}
                {edu.education_level}
                {edu.major && edu.major} {edu.school_name} {edu.school_address}
                <div className="hidden group-hover:flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
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
                      <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
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
        <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
          <h2 className="text-indigo-700 font-bold mb-2">KEAHLIAN</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {cvData.skills.map((s: any, i: number) => (
              <li key={i} className="text-start group relative hover:text-indigo-800 transition-colors duration-300">
                {s.skill_name} | {s.ability_level}
                <div className="hidden group-hover:flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
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
                      <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
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
        <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
          <h2 className="text-indigo-700 font-bold mb-2">PENGALAMAN KERJA</h2>
          <ul className="text-gray-800 space-y-1">
            {cvData.work_experiences.map((work: any, i: number) => (
              <li key={i} className="text-start group relative flex flex-col hover:text-indigo-800 transition-colors duration-300">
                <div>
                  {work.date_in &&
                    !isNaN(new Date(work.date_in).getTime()) &&
                    formatDuration(work.date_in, work.date_out)}{" "}
                  | {work.corporate} - {work.position}
                </div>
                <div>{work.jobdesk}</div>
                <div className="hidden group-hover:flex gap-2 ml-4">
                  <Dialog>
                    <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
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
                      <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
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

        {/* Tambahan
        <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
          <h2 className="text-indigo-700 font-bold mb-2">Tambahan</h2>
          <ul className="text-gray-800 space-y-1">
            {cvData.additions.map((addition: any, i: number) => (
              <li key={i} className="hover:text-indigo-800 transition-colors duration-300">
                {addition.question} - {addition.answer}
              </li>
            ))}
          </ul>
        </section> */}
      </div>
    </div>
  );
}

export function CVPreview1({ cvData, setCvData, onTrigger }: any) {
  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg w-full max-w-7xl mx-auto hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-b border-indigo-200 pb-4 sm:pb-6 mb-4 sm:mb-6 hover:scale-105 transition-transform duration-300">
        <img
          src={
            cvData.user.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s"
          }
          alt="Profile"
          className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-full object-cover border-4 border-indigo-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-serif text-indigo-900 hover:text-indigo-700 transition-colors duration-300">{cvData.user.fullname}</h1>
          <p className="text-sm sm:text-base text-gray-600 hover:text-gray-800 transition-colors duration-300">
            {cvData.user.phone} | {cvData.user.email}
          </p>
          <p className="font-medium mt-1 text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300">
            {cvData.user.address}, {cvData.user.city}, {cvData.user.region}
          </p>
        </div>
      </div>

      {/* Tentang Saya */}
      <section className="mb-6 group relative hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">Tentang Saya</h2>
        <p className="text-gray-700 leading-relaxed">{cvData.user.about}</p>
        <div className="hidden group-hover:flex gap-2 ml-4">
          <Dialog>
            <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
              <Edit className="w-4 h-4" />
            </DialogTrigger>
            <UserDialog cvData={cvData} onTrigger={onTrigger} />
          </Dialog>
        </div>
      </section>

      {/* Pendidikan */}
      <section className="mb-6 hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">Pendidikan</h2>
        <ul className="space-y-2">
          {cvData.education.map((edu: any) => (
            <li
              key={edu.id}
              className="group relative text-gray-800 font-medium hover:text-indigo-800 transition-colors duration-300"
            >
              {edu.date_in && formatYear(edu.date_in)} -{" "}
              {edu.date_out && formatYear(edu.date_out)} | {edu.education_level}{" "}
              {edu.major && `- ${edu.major}`} {edu.school_name},{" "}
              {edu.school_address}
              <div className="hidden group-hover:flex gap-2 ml-4">
                <Dialog>
                  <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
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
                    <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
                      <Trash className="w-4 h-4 text-red-600" />
                    </button>
                  </DialogTrigger>
                  <EducationDeleteDialog
                    id={edu.id}
                    onDelete={(deletedId) => {
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

      {/* Pengalaman Kerja */}
      <section className="mb-6 hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
          Pengalaman Kerja
        </h2>
        <ul className="space-y-2">
          {cvData.work_experiences.map((work: any) => (
            <li
              key={work.id}
              className="group relative text-gray-800 font-medium flex flex-col hover:text-indigo-800 transition-colors duration-300"
            >
              <div>
                {work.date_in && formatDuration(work.date_in, work.date_out)} |{" "}
                {work.corporate} - {work.position}
              </div>
              <div>{work.jobdesk}</div>
              <div className="hidden group-hover:flex gap-2 ml-4">
                <Dialog>
                  <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
                    <Edit className="w-4 h-4" />
                  </DialogTrigger>
                  <ExperienceDialog
                    id={work.id}
                    cvData={cvData}
                    onTrigger={onTrigger}
                  />
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
                      <Trash className="w-4 h-4 text-red-600" />
                    </button>
                  </DialogTrigger>
                  <ExperienceDeleteDialog
                    id={work.id}
                    onDelete={(deletedId) => {
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

      {/* Keahlian */}
      <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">Keahlian</h2>
        <ul className="space-y-1 list-disc list-inside">
          {cvData.skills.map((s: any) => (
            <li key={s.id} className="group relative text-gray-800 hover:text-indigo-800 transition-colors duration-300">
              {s.skill_name} | {s.ability_level} ⭐
              <div className="hidden group-hover:flex gap-2 ml-4">
                <Dialog>
                  <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
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
                    <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
                      <Trash className="w-4 h-4 text-red-600" />
                    </button>
                  </DialogTrigger>
                  <SkillDeleteDialog
                    id={s.id}
                    onDelete={(deletedId) => {
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
    </div>
  );
}

export function CVPreview3({ cvData, setCvData, onTrigger, cvStyle }: any) {
  return (
    <div
      id="cv-root"
      style={{
        fontFamily: cvData.font || "Inter, sans-serif",
        color: "#1f2937",
      }}
      className={`w-full h-fit mx-auto bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${cvStyle}`}
    >
      {/* Header */}
      <div className="bg-indigo-100 p-8 flex items-center gap-6 border-b border-indigo-200 hover:bg-indigo-200 transition-colors duration-300">
        <img
          src={
            cvData.user.avatar ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjKU8YDosyoTjWVSrMGvkVLFbrx2Xyn4qPrg&s"
          }
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg hover:shadow-xl transition-shadow duration-300"
        />
        <div>
          <h1 className="text-4xl font-extrabold text-indigo-900 hover:text-indigo-700 transition-colors duration-300">
            {cvData.user.fullname}
          </h1>
          <p className="text-gray-600 hover:text-gray-800 transition-colors duration-300">{cvData.user.email}</p>
          <p className="text-gray-600 hover:text-gray-800 transition-colors duration-300">{cvData.user.phone}</p>
          <p className="text-gray-600 hover:text-gray-800 transition-colors duration-300">
            {cvData.user.city}, {cvData.user.region}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-3 gap-8 p-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-6">
          {/* Tentang Saya */}
          <section className="group relative hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
              Tentang Saya
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {cvData.user.about}
            </p>
            <div className="hidden group-hover:flex gap-2 ml-4">
              <Dialog>
                <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
                  <Edit className="w-4 h-4" />
                </DialogTrigger>
                <UserDialog cvData={cvData} onTrigger={onTrigger} />
              </Dialog>
            </div>
          </section>

          {/* Keahlian */}
          <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
              Keahlian
            </h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {cvData.skills.map((s: any) => (
                <li key={s.id} className="flex justify-between group relative hover:text-indigo-800 transition-colors duration-300">
                  <span>{s.skill_name}</span>
                  <span className="text-gray-500">{s.ability_level}</span>
                  <div className="hidden group-hover:flex gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
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
                        <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
                          <Trash className="w-4 h-4 text-red-600" />
                        </button>
                      </DialogTrigger>
                      <SkillDeleteDialog
                        id={s.id}
                        onDelete={(deletedId) => {
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

          {/* Tambahan
          <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
              Tambahan
            </h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {cvData.additions.map((addition: any, i: number) => (
                <li key={i} className="hover:text-indigo-800 transition-colors duration-300">
                  <span className="font-medium">{addition.question}:</span>{" "}
                  {addition.answer}
                </li>
              ))}
            </ul>
          </section> */}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-6">
          {/* Pendidikan */}
          <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
              Pendidikan
            </h2>
            <ul className="space-y-3">
              {cvData.education.map((edu: any) => (
                <li
                  key={edu.id}
                  className="text-sm text-gray-700 group relative hover:text-indigo-800 transition-colors duration-300"
                >
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
                  <div className="hidden group-hover:flex gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
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
                        <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
                          <Trash className="w-4 h-4 text-red-600" />
                        </button>
                      </DialogTrigger>
                      <EducationDeleteDialog
                        id={edu.id}
                        onDelete={(deletedId) => {
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

          {/* Pengalaman Kerja */}
          <section className="hover:scale-105 hover:shadow-lg transition-all duration-300 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-indigo-700 border-b border-indigo-200 pb-1 mb-2">
              Pengalaman Kerja
            </h2>
            <ul className="space-y-3">
              {cvData.work_experiences.map((work: any) => (
                <li
                  key={work.id}
                  className="text-sm text-gray-700 group relative hover:text-indigo-800 transition-colors duration-300"
                >
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-900">
                      {work.position} - {work.corporate}
                    </span>
                    <span className="text-xs text-gray-500">
                      {work.date_in && formatYear(work.date_in)} -{" "}
                      {work.date_out && formatYear(work.date_out)} |{" "}
                      {work.date_in &&
                        work.date_out &&
                        formatDuration(work.date_in, work.date_out)}
                    </span>
                  </div>
                  <p className="text-gray-600">{work.jobdesk}</p>
                  <div className="hidden group-hover:flex gap-2 ml-4">
                    <Dialog>
                      <DialogTrigger className="cursor-pointer hover:bg-indigo-100 hover:rounded hover:p-1 transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </DialogTrigger>
                      <ExperienceDialog
                        id={work.id}
                        cvData={cvData}
                        onTrigger={onTrigger}
                      />
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="cursor-pointer hover:bg-red-100 hover:rounded hover:p-1 transition-colors duration-200">
                          <Trash className="w-4 h-4 text-red-600" />
                        </button>
                      </DialogTrigger>
                      <ExperienceDeleteDialog
                        id={work.id}
                        onDelete={(deletedId) => {
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
        </div>
      </div>
    </div>
  );
}
