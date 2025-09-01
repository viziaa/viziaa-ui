import api from "@/services/api";
import { UserProps } from "@/types/cv-type";
import React, { useEffect, useState } from "react";

export function UserForm({ cvData, setUserData, setCvData }:UserProps) {
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatar, setAvatar] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addUser = async () => {
    try {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("nickname", nickname);
        formData.append("fullname", fullname);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("region", region);
        formData.append("birthdate", new Date(birthdate).toISOString());
        formData.append("phone", phone);
        formData.append("about", about);

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      const res = await api.put(`/user/data`, formData ,{
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(res);

      setUserData(res.data);

    } catch (err: any) {
      console.error("Fetch User error", err);
      setErrorMsg(err.response?.data?.message || "Gagal tambah user| Semua Input Wajib Terisi");
    }
  };


  useEffect(() => {
        setId(cvData.user.id)
        setEmail(cvData.user.email);
        setNickname(cvData.user.nickname);
        setFullname(cvData.user.fullname);
        setAddress(cvData.user.address);
        setCity(cvData.user.city);
        setRegion(cvData.user.region);
        if (cvData.user.birthdate) {
        // kalau sudah Date object
        const date =
        cvData.user.birthdate instanceof Date
            ? cvData.user.birthdate
            : new Date(cvData.user.birthdate);

            if (!isNaN(date.getTime())) {
            setBirthdate(date.toISOString().split("T")[0]); // YYYY-MM-DD
            }
        }
        setPhone(String(cvData.user.phone));
        setAbout(cvData.user.about);
        setAvatar(cvData.user.avatar);
        console.log(avatar)
    
      }, [cvData]);

  return (
    <div className="p-4 border rounded-xl shadow-sm shadow-blue-300">
      <h3 className="font-semibold text-blue-700">User</h3>
      <label htmlFor="email" className=" mt-2 ml-2 text-gray-400"> Email </label>
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={email}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, email: e.target.value}}))}
      />
      <label htmlFor="nickname" className=" mt-2 ml-2 text-gray-400"> Nickname </label>
      <input
        type="text"
        placeholder="Nickname"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={nickname}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, nickname: e.target.value}}))}
      />
      <label htmlFor="fullname" className=" mt-2 ml-2 text-gray-400"> Fullname </label>
      <input
        type="text"
        placeholder="Fullname"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={fullname}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, fullname: e.target.value}}))}
      />
      <label htmlFor="address" className=" mt-2 ml-2 text-gray-400"> Address </label>
      <input
        type="text"
        placeholder="Address"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={address}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, address: e.target.value}}))}
      />
      <label htmlFor="avatar" className=" mt-2 ml-2 text-gray-400"> City </label>
      <input
        type="text"
        placeholder="city"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={city}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, city: e.target.value}}))}
      />
      <label htmlFor="region" className=" mt-2 ml-2 text-gray-400"> Region </label>
      <input
        type="text"
        placeholder="Region"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={region}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, region: e.target.value}}))}
      />
      <label htmlFor="birthdate" className=" mt-2 ml-2 text-gray-400"> Birthdate </label>
      <input
        type="date"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={birthdate}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, birthdate:new Date (e.target.value)}}))}
      />
      <label htmlFor="phone" className=" mt-2 ml-2 text-gray-400"> Phone </label>
      <input
        type="number"
        placeholder="Phone"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={phone}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, phone: e.target.value}}))}
      />
      <label htmlFor="about" className=" mt-2 ml-2 text-gray-400"> About </label>
      <textarea
        placeholder="About"
        className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
        value={about}
        onChange={(e) => setCvData((prev) => ({...prev, user:{ ...prev.user, about: e.target.value}}))}
      />
      <label htmlFor="avatar" className=" mt-2 ml-3 text-gray-400"> Avatar </label>
        {avatar && <img src={avatar} className="h-20 w-20 rounded-2xl" />}
        <input
            type="file"
            name="avatar"
            accept="image/*"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            onChange={(e) =>  { const file = e.target.files?.[0] || null;
                 setAvatarFile(file);
                 setCvData((prev) => ({...prev, user:{ ...prev.user, avatar: file ? URL.createObjectURL(file) : avatar}}))
                  }
            }
        />
      

      {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}

      <button
        onClick={addUser}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Tambah User
      </button>
    </div>
  );
}
