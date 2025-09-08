"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";

const MySwal = withReactContent(Swal);

export default function RegisterPage() {
  const [form, setForm] = useState({ email: "", password: "", fullname: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      setLoading(false);

      await MySwal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "Please login to continue.",
        confirmButtonText: "OK",
      });

      router.push("/auth/login");
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className="min-h-screen flex bg-gray-50">
      {/* Left Section - Branding & Animation */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-12">
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          viziaa<span className="text-green-500">App</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-md text-center">
          Join <span className="font-semibold">viziaaApp</span> today 🌱 Create
          an account and start building your professional CV in minutes.
        </p>

        {/* Animated Elements */}
        <div className="relative mt-10 w-72 h-72">
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-green-400/40"
            animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-emerald-400/40"
            animate={{ x: [0, -70, 0], y: [0, 60, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-green-300/40"
            animate={{ y: [0, -80, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Right Section - Register */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="bg-white shadow-md rounded-2xl p-8 space-y-6 border">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Create an Account 🌟
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Sign up to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label htmlFor="fullname">Fullname</Label>
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  placeholder="Your name"
                  value={form.fullname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                {error && (
                  <p className="text-sm text-red-600 text-center mt-1">
                    {error}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl py-2 font-medium bg-green-500 hover:bg-green-600"
              >
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </div>

          {/* Login CTA */}
          <div className="bg-white border rounded-2xl p-6 text-center shadow-sm">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-green-500 font-semibold hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
