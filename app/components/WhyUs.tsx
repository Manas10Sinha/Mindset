"use client";

import { Brain, Lightbulb, Cpu, Atom } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Boost Intellect",
    desc: "Enhance logical thinking and problem-solving skills in children.",
  },
  {
    icon: Lightbulb,
    title: "Creativity",
    desc: "Encourage innovative thinking through fun learning methods.",
  },
  {
    icon: Cpu,
    title: "Future Skills",
    desc: "Prepare your child for AI, coding, and modern technologies.",
  },
  {
    icon: Atom,
    title: "STEM Learning",
    desc: "Strong foundation in science, math, and technology.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="bg-white py-12 sm:py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {/* HEADING */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
          Why Choose Us?
        </h2>

        <p className="mt-3 sm:mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
          We provide a complete learning ecosystem that helps children grow
          intellectually and creatively.
        </p>

        {/* CARDS */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8">
          {features.map((item, i) => {
            const Icon = item.icon;

            return (
              <div
                key={i}
                className="bg-[#F9FAFB] p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* ICON */}
                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-orange-100 text-orange-500 rounded-full">
                  <Icon size={22} />
                </div>

                {/* TITLE */}
                <h3 className="mt-4 text-base sm:text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                {/* DESC */}
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
