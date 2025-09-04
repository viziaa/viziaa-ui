"use client";

import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import api from "@/services/api"; // pastikan kamu punya instance axios di sini

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.post("/auth/logout");
          Swal.fire("Logged out!", "You have been logged out.", "success");
          router.push("/auth/login"); // redirect ke login page
        } catch (error) {
          Swal.fire("Error", "Failed to logout. Please try again.", "error");
        }
      }
    });
  };

  return (
    <nav className="flex items-center justify-between bg-gray-700 px-6 py-3 shadow-md">
      {/* Logo */}
      <Link href={""}>
        <div className="flex items-center">
          <Image
            src="/viziaa.png"
            alt="Viziaa Logo"
            width={40}
            height={20}
            className="rounded-full"
          />

          <h1 className="m-3 text-amber-50 font-bold ">VIZIAA</h1>
        </div>
      </Link>
      {/* Menu */}
      <div className="flex items-center gap-10">
        <ul className="flex space-x-8 text-white font-semibold">
          <li>
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-blue-400">
              About
            </Link>
          </li>
          <li>
            <Link href="/history" className="hover:text-blue-400">
              My-cv
            </Link>
          </li>
        </ul>

        {/* Icon Bulat + Logout */}
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
