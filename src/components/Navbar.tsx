import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-gray-700 px-6 py-3 shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="/viziaa.png"
          alt="Viziaa Logo"
          width={40}
          height={20}
          className="rounded-full"
        />
      </div>

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

        {/* Icon Bulat Kanan */}
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
      </div>
    </nav>
  );
}
