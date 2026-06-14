"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { scrollToId } from "../handlers/scrollTo";

export default function Navbar() {
  const [active, setActive] = useState("home");

  const sections = ["home", "why", "plans", "demo", "faq"];

  // 🔥 Detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      let current = "home";

      sections.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          const top = section.offsetTop - 100;
          if (window.scrollY >= top) {
            current = id;
          }
        }
      });

      setActive(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => scrollToId("home")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Image src="/logo1.png" alt="logo" width={250} height={250} />
        </div>

        {/* Menu */}
        <div className="hidden md:flex gap-8 font-medium">
          {[
            { id: "home", label: "Home" },
            { id: "why", label: "Why Us?" },
            { id: "plans", label: "Our Plans" },
            { id: "faq", label: "FAQ" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToId(item.id)}
              className={`cursor-pointer transition ${
                active === item.id
                  ? "text-orange-500 font-semibold"
                  : "text-gray-600 hover:text-orange-500"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollToId("demo")}
          className="hidden sm:inline-flex bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition cursor-pointer"
        >
          TRY A FREE LESSON
        </button>
      </div>
    </nav>
  );
}
