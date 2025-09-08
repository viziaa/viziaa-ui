"use client";

import { useEffect, useState } from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import api from "@/services/api";
import { EditUserDialogProps } from "@/types/cv-type";


export function UserDialog({ cvData, onTrigger }:EditUserDialogProps) {
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
    const [loading, setLoading] = useState(false);

  useEffect(()=>{
    const user = cvData.user;
    if(!user) return
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
  },[])

  const handleSave = async () => {
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

      setLoading(true);
      const res = await api.put(`/user/data`, formData ,{
        headers: { "Content-Type": "multipart/form-data" }
      });

      onTrigger(`edit data user ${res.data.data.nickname} Berhasil`)
     
    } catch (err) {
      console.error("Error save education", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit data Pendidikan</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <label htmlFor="email" className=" mt-2 ml-2 text-gray-400"> Email </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="nickname" className=" mt-2 ml-2 text-gray-400"> Nickname </label>
          <input
            type="text"
            placeholder="Nickname"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <label htmlFor="fullname" className=" mt-2 ml-2 text-gray-400"> Fullname </label>
          <input
            type="text"
            placeholder="Fullname"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          <label htmlFor="address" className=" mt-2 ml-2 text-gray-400"> Address </label>
          <input
            type="text"
            placeholder="Address"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="avatar" className=" mt-2 ml-2 text-gray-400"> City </label>
          <input
            type="text"
            placeholder="city"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <label htmlFor="region" className=" mt-2 ml-2 text-gray-400"> Region </label>
          <input
            type="text"
            placeholder="Region"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
          <label htmlFor="birthdate" className=" mt-2 ml-2 text-gray-400"> Birthdate </label>
          <input
            type="date"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={birthdate}
            onChange={(e) => setBirthdate(new Date (e.target.value).toISOString().split("T")[0])}
          />
          <label htmlFor="phone" className=" mt-2 ml-2 text-gray-400"> Phone </label>
          <input
            type="number"
            placeholder="Phone"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <label htmlFor="about" className=" mt-2 ml-2 text-gray-400"> About </label>
          <textarea
            placeholder="About"
            className="w-full p-2 mt-2 border text-gray-400 hover:text-black rounded"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
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
                    setAvatar(file ? URL.createObjectURL(file) : avatar)
                      }
                }
            />
        </div>
        <DialogFooter>
          <DialogClose asChild>
              <Button onClick={handleSave} disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </Button>
           </DialogClose>
        </DialogFooter>
      </DialogContent>
  );
}
