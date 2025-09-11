"use client";

import api from "@/services/api"; // pastikan kamu punya instance axios di sini
import { UserItem } from "@/types/cv-type";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Navbar() {
  const [user, setUser] = useState<UserItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchuser = async () => {
      try {
        const Aresponse = await api.get("/user");
        setUser(Aresponse.data); // Simpan objek user, bukan hanya cv
      } catch (error: any) {
        console.error("Error fetching CV data:", error);
        setUser(null);
        if (
          error.response?.data?.message === "Tidak ada session" ||
          "Gagal mendapatkan user"
        ) {
          Swal.fire({
            title: "Kamu belum login",
            text: "Mengalihkan ke halaman login...",
            icon: "warning",
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
              setTimeout(() => {
                Swal.close();
                router.push("/auth/login");
              }, 2000); // delay 2 detik biar ada efek loading
            },
          });
        }
      }
    };

    fetchuser();
  }, []);

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
    <nav className="relative flex items-center justify-between bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 px-6 lg:px-14 py-4 shadow-xl backdrop-blur-sm border-b border-indigo-700/50 z-50">
      {/* Logo */}
      <Link href={""} className="group">
        <div className="flex items-center space-x-3 hover:scale-105 transition-all duration-300">
          <div className="relative">
            <Image
              src="/viziaa.png"
              alt="Viziaa Logo"
              width={45}
              height={22}
              className="rounded-full shadow-lg ring-2 ring-indigo-400/30 group-hover:ring-indigo-400/60 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <h1 className="text-white font-bold text-xl tracking-wide group-hover:text-indigo-100 transition-colors duration-300">
            VIZIAA
          </h1>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        <ul className="flex space-x-6 text-white font-medium items-center">
          <li>
            <Link
              href="/"
              className="relative px-3 py-2 rounded-lg hover:bg-indigo-700/50 hover:text-indigo-100 transition-all duration-300 group"
            >
              <span className="relative z-10">My CV</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/0 to-indigo-600/0 group-hover:from-indigo-600/20 group-hover:to-purple-600/20 rounded-lg transition-all duration-300"></div>
            </Link>
          </li>
        </ul>

        {/* User Avatar + Logout */}
        <div className="flex items-center gap-4 ml-6">
          <div className="relative group">
            <div className="relative group">
              {user ? (
                <img
                  src={user.avatar || "/default-avatar.png"}
                  alt=""
                  className="w-10 h-10 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 cursor-pointer ring-2 ring-white/20 hover:ring-white/40"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-indigo-900 shadow-sm"></div>
          </div>
          <button
            onClick={handleLogout}
            className="cursor-pointer relative px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500/50"
          >
            <span className="relative z-10 ">Logout</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 to-red-400/0 hover:from-red-400/20 hover:to-red-400/20 rounded-lg transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white hover:text-indigo-100 transition-colors duration-300 z-40"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-indigo-900 shadow-lg border-t border-indigo-700/50 z-40">
          <ul className="flex flex-col space-y-2 p-4 text-white font-medium">
            <li>
              <Link
                href="/"
                className="block px-3 py-2 rounded-lg hover:bg-indigo-700/50 hover:text-indigo-100 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block px-3 py-2 rounded-lg hover:bg-indigo-700/50 hover:text-indigo-100 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className="block px-3 py-2 rounded-lg hover:bg-indigo-700/50 hover:text-indigo-100 transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                My CV
              </Link>
            </li>
            <li className="border-t border-indigo-700/50 pt-2 mt-2">
              <div className="flex items-center gap-4 px-3 py-2">
                <div className="relative group">
                  {user ? (
                    <img
                      src={user.avatar || "/default-avatar.png"}
                      alt=""
                      className="w-8 h-8 rounded-full shadow-lg ring-2 ring-white/20"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-700 animate-pulse" />
                  )}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 px-3 py-1 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
