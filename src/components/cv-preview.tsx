import api from "@/services/api";
import { useEffect, useState } from "react";
import { EducationDialog } from "./formEdit-section/education-edit";
import { Edit, Trash } from "lucide-react";
import { Dialog, DialogTrigger } from "./ui/dialog";


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

export function CVPreview({ cvData }: any) {
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
        {" "}
        <h2 className="text-lg font-bold border-b pb-1 mb-2">
          Tentang Saya
        </h2>{" "}
        <p className="text-gray-700 leading-relaxed">{cvData.user.about}</p>{" "}
      </section>{" "}
      {/* Pendidikan */}{" "}
      <section className="mb-6">
        {" "}
        <h2 className="text-lg font-bold border-b pb-1 mb-2">
          Pendidikan
        </h2>{" "}
        <ul className="space-y-2">
          {" "}
          {cvData.education.map((edu: any, i: number) => (
            <li key={i} className="text-gray-800 font-medium">
              {" "}
              {edu.date_in} - {edu.date_out} | {edu.school}{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </section>{" "}
      {/* Pengalaman Kerja */}{" "}
      <section className="mb-6">
        {" "}
        <h2 className="text-lg font-bold border-b pb-1 mb-2">
          {" "}
          Pengalaman Kerja{" "}
        </h2>{" "}
        <ul className="space-y-2">
          {" "}
          {cvData.work_experiences.map((work: any, i: number) => (
            <li key={i} className="text-gray-800 font-medium">
              {" "}
              {work.date_in} - {work.date_out} | {work.corporate}{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </section>{" "}
      {/* Kemampuan */}{" "}
      <section>
        {" "}
        <h2 className="text-lg font-bold border-b pb-1 mb-2">Kemampuan</h2>{" "}
        <ul className="space-y-1 list-disc list-inside">
          {" "}
          {cvData.skills.map((s: any, i: number) => (
            <li key={i} className="text-gray-800">
              {" "}
              {s.skill_name} | {s.ability_level} ⭐{" "}
            </li>
          ))}{" "}
        </ul>{" "}
      </section>
    </div>
  );
}

export default function CVPreview2({ cvData, setEducationData }: any) {
  return (
    <div
      style={{
        fontFamily: cvData.font || "sans-serif",
        color: "#d51a52", // default gray-800
      }}
      className={"w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden"}
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
        <section>
          <h2 className="text-blue-900 font-bold mb-2">DATA PRIBADI</h2>
          <div className="text-gray-800 space-y-1">
            <p>Nama: {cvData.user.fullname}</p>
            <p>
              Tanggal Lahir:{" "}
              {cvData.user.birthdate
                ? new Date(cvData.user.birthdate).toLocaleDateString()
                : "-"}
            </p>
            <p>Alamat: {cvData.user.address}</p>
            <p>No. Handphone: {cvData.user.phone}</p>
            <p>Email: {cvData.user.email}</p>
          </div>
        </section>

        {/* Tentang Saya */}
        <section>
          <h2 className="text-blue-900 font-bold mb-2">TENTANG SAYA</h2>
          <p className="text-gray-700 leading-relaxed">{cvData.user.about}</p>
        </section>

        {/* Pendidikan */}
        <section>
          <h2 className="text-blue-900 font-bold mb-2">PENDIDIKAN</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {cvData.education.map((edu: any, i: number) => (              
                  <li key={i} className="group relative">
                    {edu.date_in && !isNaN(new Date(edu.date_in).getTime()) && new Date(edu.date_in).toLocaleDateString()} - {edu.date_out && new Date(edu.date_out).toLocaleDateString()} | {edu.education_level} {edu.school_name} {edu.school_address}
                  <div className="hidden group-hover:flex gap-2 ml-4">
                      <Dialog >
                        <DialogTrigger className="cursor-pointer hover:bg-blue-300 hover:rounded hover:p-1">
                      <Edit className="w-4 h-4" />
                      </DialogTrigger>
                        < EducationDialog id={edu.id} cvData={cvData} setEducationData={setEducationData}/>
                      </Dialog>
                      <Dialog >
                        <DialogTrigger className="cursor-pointer hover:bg-red-300 hover:rounded hover:p-1">
                      <Trash className="w-4 h-4 text-red-600" />
                      </DialogTrigger>
                        < EducationDialog id={edu.id} cvData={cvData} setEducationData={setEducationData}/>
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
              <li key={i}>
                {s.skill_name} | {s.ability_level}
              </li>
            ))}
          </ul>
        </section>

        {/* Pengalaman Kerja */}
        <section>
          <h2 className="text-blue-900 font-bold mb-2">PENGALAMAN KERJA</h2>
          <ul className="text-gray-800 space-y-1">
            {cvData.work_experiences.map((work: any, i: number) => (
              <li key={i}>
                {work.date_in &&
                  !isNaN(new Date(work.date_in).getTime()) &&
                  new Date(work.date_in).toLocaleDateString()}{" "}
                -{" "}
                {work.date_in &&
                  !isNaN(new Date(work.date_in).getTime()) &&
                  new Date(work.date_out).toLocaleDateString()}{" "}
                | {work.corporate}
              </li>
            ))}
          </ul>
        </section>
        {/* Pengalaman Kerja */}
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
