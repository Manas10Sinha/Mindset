"use client";

import {
  Blocks,
  Smartphone,
  BrainCircuit,
  Globe,
  Database,
  Calculator,
  Dna,
} from "lucide-react";

// ================= DATA ================= //

const codingBlock = [
  {
    icon: Blocks,
    title: "Scratch Programming",
    module: "Module 1",
    details: "24 lessons • 2 months",
  },
  {
    icon: Smartphone,
    title: "App Development (Thunkable)",
    module: "Module 2",
    details: "24 lessons • 2 months",
  },
  {
    icon: BrainCircuit,
    title: "AI / ML (Machine Learning for Kids)",
    module: "Module 3",
    details: "12 lessons • 1 month",
  },
];

const codingText = [
  {
    icon: Globe,
    title: "Web Development (HTML, CSS, JS)",
    module: "Module 4",
    details: "36 lessons • 3 months",
  },
  {
    icon: Database,
    title: "Python & Data Science",
    module: "Module 5",
    details: "36 lessons • 3 months",
  },
];

const academic = [
  {
    icon: Calculator,
    title: "Mathematics (Grade 1–8)",
    details: "36 lessons • 3 months",
  },
  {
    icon: Dna,
    title: "Science (Grade 1–8)",
    details: "36 lessons • 3 months",
  },
];

// ================= CARD ================= //

function Card({
  item,
  onSelectTopic,
}: {
  item: any;
  onSelectTopic: (topic: string) => void;
}) {
  const Icon = item.icon;

  return (
    <div className="group bg-white border border-gray-100 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-65">
      {/* ICON */}
      <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-orange-100 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition">
        <Icon size={20} />
      </div>

      {/* CONTENT */}
      <div className="mt-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
          {item.title}
        </h3>

        {item.module && (
          <p className="text-sm text-orange-500 font-medium mt-1">
            {item.module}
          </p>
        )}

        <p className="mt-2 text-sm text-gray-600">{item.details}</p>
      </div>

      {/* PRICING */}
      <div className="mt-4">
        <span className="text-lg sm:text-xl font-bold text-gray-900">₹299</span>
        <span className="text-sm text-gray-400 line-through ml-2">₹800</span>
        <p className="text-xs text-gray-500">per lesson</p>
      </div>

      {/* CTA */}
      <button
        onClick={() => {
          onSelectTopic(item.title);
          document.getElementById("demo")?.scrollIntoView({
            behavior: "smooth",
          });
        }}
        className="mt-5 w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition"
      >
        Try a Free Lesson
      </button>
    </div>
  );
}

// ================= MAIN ================= //

export default function Plans({
  onSelectTopic,
}: {
  onSelectTopic: (topic: string) => void;
}) {
  return (
    <section
      id="plans"
      className="bg-linear-to-b from-[#b3cbe2] to-white py-14 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Our Learning Plans
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Structured, beginner-friendly learning paths designed for kids and
            teens to master coding and academics step by step.
          </p>
        </div>

        {/* CODING LABS */}
        <div className="mb-12 sm:mb-14">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 sm:mb-6">
            Coding Labs
          </h3>

          {/* BLOCK BASED */}
          <h4 className="text-base sm:text-lg font-semibold text-orange-500 mb-4">
            Block-Based Learning
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {codingBlock.map((item, i) => (
              <Card key={i} item={item} onSelectTopic={onSelectTopic} />
            ))}
          </div>

          {/* TEXT BASED */}
          <h4 className="text-base sm:text-lg font-semibold text-orange-500 mt-10 sm:mt-12 mb-4">
            Text-Based Learning
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {codingText.map((item, i) => (
              <Card key={i} item={item} onSelectTopic={onSelectTopic} />
            ))}
          </div>
        </div>

        {/* ACADEMIC */}
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 sm:mb-6">
            Academic Support
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {academic.map((item, i) => (
              <Card key={i} item={item} onSelectTopic={onSelectTopic} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
