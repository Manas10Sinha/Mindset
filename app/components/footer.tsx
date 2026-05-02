"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { scrollToId } from "../handlers/scrollTo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl font-bold text-orange-500">Mindset</h2>
            <p className="mt-4 text-sm text-gray-300 leading-relaxed">
              Empowering kids and teens with coding, math, and science skills
              for a smarter future.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>

            <ul className="space-y-2 text-sm text-gray-300">
              <li
                onClick={() => scrollToId("home")}
                className="hover:text-orange-400 cursor-pointer"
              >
                Home
              </li>

              <li
                onClick={() => scrollToId("plans")}
                className="hover:text-orange-400 cursor-pointer"
              >
                Plans
              </li>

              <li
                onClick={() => scrollToId("demo")}
                className="hover:text-orange-400 cursor-pointer"
              >
                Book Demo
              </li>

              <li
                onClick={() => scrollToId("why")}
                className="hover:text-orange-400 cursor-pointer"
              >
                Why Us
              </li>

              <li
                onClick={() => scrollToId("faq")}
                className="hover:text-orange-400 cursor-pointer"
              >
                FAQ
              </li>
            </ul>
          </div>

          {/* COURSES */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Courses</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Scratch Programming</li>
              <li>App Development</li>
              <li>AI / ML</li>
              <li>Web Development</li>
              <li>Python & Data Science</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>

            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-orange-400" />
                support@mindset.com
              </div>

              <div className="flex items-center gap-2">
                <Phone size={16} className="text-orange-400" />
                +91 9696873754
              </div>

              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-orange-400 mt-1" />
                India (Online Learning Platform)
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Mindset. All rights reserved.
        </div>

        {/* CREDIT */}
        <div className="mt-4 text-center text-xs text-gray-500">
          Made with ❤️ by{" "}
          <span className="text-orange-400 font-semibold">WebAdven</span>
        </div>
      </div>
    </footer>
  );
}
