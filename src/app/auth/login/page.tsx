"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import MySwal from "sweetalert2";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/auth/login", form);

      MySwal.close();
      await MySwal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back! Redirecting to dashboard...`,
        timer: 2000,
        showConfirmButton: false,
      });

      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
      MySwal.close();
      MySwal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "An error occurred during login",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex bg-gray-50">
      {/* Left Section - Branding & Animation */}
      <div className="hidden lg:flex w-1/2 flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-12">
        {/* App Title */}
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
          viziaa<span className="text-blue-500">App</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-md text-center">
          The fastest way to craft a{" "}
          <span className="font-semibold">professional CV</span>. Build,
          customize, and download your resume in minutes 🚀
        </p>

        {/* Animated Elements */}
        <div className="relative mt-10 w-72 h-72">
          <motion.div
            className="absolute w-32 h-32 rounded-full bg-blue-400/40"
            animate={{ x: [0, 80, 0], y: [0, -60, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-indigo-400/40"
            animate={{ x: [0, -70, 0], y: [0, 60, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-20 h-20 rounded-full bg-blue-300/40"
            animate={{ y: [0, -80, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Right Section - Login */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Login Box */}
          <div className="bg-white shadow-md rounded-2xl p-8 space-y-6 border">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Welcome Back 👋
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Sign in to continue your journey
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full rounded-xl py-2 font-medium"
              >
                {loading ? "Processing..." : "Login"}
              </Button>
            </form>
          </div>

          {/* Register CTA */}
          <div className="bg-white border rounded-2xl p-6 text-center shadow-sm">
            <p className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a
                href="/auth/register"
                className="text-blue-500 font-semibold hover:underline"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
