"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";

import {
  Blocks,
  Smartphone,
  BrainCircuit,
  Globe,
  Database,
  Calculator,
  Dna,
  X,
} from "lucide-react";

// ================= DATA ================= //

const codingBlock = [
  {
    icon: Blocks,
    title: "Scratch Programming",
    module: "Module 1",
    details: "24 lessons • 2 months",
    curriculum: "/curriculum/scratchCurr.png",
  },
  {
    icon: Smartphone,
    title: "App Development (Thunkable)",
    module: "Module 2",
    details: "24 lessons • 2 months",
    curriculum: "/curriculum/appDevelopment.png",
  },
  {
    icon: BrainCircuit,
    title: "AI / ML (Machine Learning for Kids)",
    module: "Module 3",
    details: "12 lessons • 1 month",
    curriculum: "/curriculum/AIML.png",
  },
];

const codingText = [
  {
    icon: Globe,
    title: "Web Development (HTML, CSS, JS)",
    module: "Module 4",
    details: "36 lessons • 3 months",
    curriculum: "/curriculum/HTML.png",
  },
  {
    icon: Database,
    title: "Python & Data Science",
    module: "Module 5",
    details: "36 lessons • 3 months",
    curriculum: "/curriculum/Python.png",
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

// ================= MODAL ================= //

function CurriculumModal({
  image,
  onClose,
}: {
  image: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-3 sm:p-4">
      {/* MODAL CONTAINER */}
      <div className="bg-white rounded-2xl w-full max-w-5xl relative animate-in fade-in zoom-in duration-200 shadow-2xl overflow-hidden">
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 bg-white/90 hover:bg-white text-gray-700 rounded-full p-1.5 shadow-md transition"
        >
          <X size={22} className="sm:w-6 sm:h-6" />
        </button>

        {/* CONTENT */}
        <div className="flex flex-col">
          {/* IMAGE WRAPPER */}
          <div className="relative w-full h-[60vh] sm:h-[70vh] md:h-[80vh] bg-gray-50">
            <Image
              src={image}
              alt="Curriculum"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* FOOTER */}
          <div className="p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              View or download the complete curriculum.
            </p>

            <a
              href={image}
              onClick={() => {
                const toastId = toast.loading("Downloading...");

                setTimeout(() => {
                  toast.success("Downloaded!", { id: toastId });
                }, 1200);
              }}
              download
              className="w-full sm:w-auto text-center bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-semibold transition"
            >
              Download Curriculum
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= CARD ================= //

function Card({
  item,
  onSelectTopic,
  onOpenCurriculum,
}: {
  item: any;
  onSelectTopic: (topic: string) => void;
  onOpenCurriculum?: (image: string) => void;
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

        {/* DETAILS + CURRICULUM BUTTON */}
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-600">{item.details}</p>

          {item.curriculum && onOpenCurriculum && (
            <button
              onClick={() => onOpenCurriculum(item.curriculum)}
              className="text-xs bg-orange-400 text-white px-3 py-1 rounded-lg font-medium whitespace-nowrap cursor-pointer"
            >
              Curriculum
            </button>
          )}
        </div>
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
        className="mt-5 w-full bg-linear-to-r  from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90  active:scale-[0.98] transition cursor-pointer"
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
  const [selectedCurriculum, setSelectedCurriculum] = useState<{
    image: string;
  } | null>(null);

  return (
    <>
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
                <Card
                  key={i}
                  item={item}
                  onSelectTopic={onSelectTopic}
                  onOpenCurriculum={(image) => setSelectedCurriculum({ image })}
                />
              ))}
            </div>

            {/* TEXT BASED */}
            <h4 className="text-base sm:text-lg font-semibold text-orange-500 mt-10 sm:mt-12 mb-4">
              Text-Based Learning
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {codingText.map((item, i) => (
                <Card
                  key={i}
                  item={item}
                  onSelectTopic={onSelectTopic}
                  onOpenCurriculum={(image) => setSelectedCurriculum({ image })}
                />
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

      {/* CURRICULUM MODAL */}
      {selectedCurriculum && (
        <CurriculumModal
          image={selectedCurriculum.image}
          onClose={() => setSelectedCurriculum(null)}
        />
      )}
    </>
  );
}
// import { useState } from "react";
// import Image from "next/image";

// import {
//   Blocks,
//   Smartphone,
//   BrainCircuit,
//   Globe,
//   Database,
//   Calculator,
//   Dna,
//   X,
// } from "lucide-react";

// // ================= DATA ================= //

// const codingBlock = [
//   {
//     icon: Blocks,
//     title: "Scratch Programming",
//     module: "Module 1",
//     details: "24 lessons • 2 months",
//     curriculumImage: "@/public/curriculum/scratchCurr.png",
//   },
//   {
//     icon: Smartphone,
//     title: "App Development (Thunkable)",
//     module: "Module 2",
//     details: "24 lessons • 2 months",
//     curriculumImage: "@/public/curriculum/appDevelopment.png",
//   },
//   {
//     icon: BrainCircuit,
//     title: "AI / ML (Machine Learning for Kids)",
//     module: "Module 3",
//     details: "12 lessons • 1 month",
//     curriculumImage: "@/public/curriculum/AIML.png",
//   },
// ];

// const codingText = [
//   {
//     icon: Globe,
//     title: "Web Development (HTML, CSS, JS)",
//     module: "Module 4",
//     details: "36 lessons • 3 months",
//     curriculumImage: "@/public/curriculum/HTML.png",
//   },
//   {
//     icon: Database,
//     title: "Python & Data Science",
//     module: "Module 5",
//     details: "36 lessons • 3 months",
//     curriculumImage: "@/public/curriculum/Python.png",
//   },
// ];

// const academic = [
//   {
//     icon: Calculator,
//     title: "Mathematics (Grade 1–8)",
//     details: "36 lessons • 3 months",
//   },
//   {
//     icon: Dna,
//     title: "Science (Grade 1–8)",
//     details: "36 lessons • 3 months",
//   },
// ];
// // ================= MODAL ================= //
// function CurriculumModal({
//   image,
//   onClose,
// }: {
//   image: string;
//   onClose: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl max-w-3xl w-full p-4 relative animate-in fade-in zoom-in duration-200">
//         {/* CLOSE */}
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-black"
//         >
//           <X size={24} />
//         </button>

//         {/* IMAGE */}
//         <div className="relative w-full h-[70vh]">
//           <Image
//             src={image}
//             alt="Curriculum"
//             fill
//             className="object-contain rounded-xl"
//           />
//         </div>

//         {/* DOWNLOAD */}
//         <a
//           href={image}
//           download
//           className="mt-5 inline-block bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-xl font-semibold transition"
//         >
//           Download Curriculum
//         </a>
//       </div>
//     </div>
//   );
// }

// // ================= CARD ================= //

// function Card({
//   item,
//   onSelectTopic,
//   onOpenCurriculum,
// }: {
//   item: any;
//   onSelectTopic: (topic: string) => void;
//   onOpenCurriculum: (image: string) => void;
// }) {
//   const Icon = item.icon;

//   return (
//     <div className="group bg-white border border-gray-100 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-65">
//       {/* ICON */}
//       <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center bg-orange-100 text-orange-500 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition">
//         <Icon size={20} />
//       </div>

//       {/* CONTENT */}
//       <div className="mt-4">
//         <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
//           {item.title}
//         </h3>

//         {item.module && (
//           <p className="text-sm text-orange-500 font-medium mt-1">
//             {item.module}
//           </p>
//         )}

//         {/* DETAILS + CURRICULUM BUTTON */}
//         <div className="mt-2 flex items-center justify-between gap-3">
//           <p className="text-sm text-gray-600">{item.details}</p>

//           {item.curriculum && onOpenCurriculum && (
//             <button
//               onClick={() => onOpenCurriculum(item.curriculum)}
//               className="text-xs bg-gray-100 hover:bg-orange-500 hover:text-white transition px-3 py-1 rounded-lg font-medium whitespace-nowrap"
//             >
//               Curriculum
//             </button>
//           )}
//         </div>

//         {/* PRICING */}
//         <div className="mt-4">
//           <span className="text-lg sm:text-xl font-bold text-gray-900">
//             ₹299
//           </span>
//           <span className="text-sm text-gray-400 line-through ml-2">₹800</span>
//           <p className="text-xs text-gray-500">per lesson</p>
//         </div>

//         {/* CTA */}
//         <button
//           onClick={() => {
//             onSelectTopic(item.title);
//             document.getElementById("demo")?.scrollIntoView({
//               behavior: "smooth",
//             });
//           }}
//           className="mt-5 w-full bg-linear-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-xl font-semibold hover:opacity-90 active:scale-[0.98] transition"
//         >
//           Try a Free Lesson
//         </button>
//       </div>
//     </div>
//   );
// }

// // ================= MAIN ================= //

// export default function Plans({
//   onSelectTopic,
// }: {
//   onSelectTopic: (topic: string) => void;
// }) {
//   const [selectedCurriculum, setSelectedCurriculum] = useState<{
//     image: string;
//   } | null>(null);
//   return (
//     <section
//       id="plans"
//       className="bg-linear-to-b from-[#b3cbe2] to-white py-14 sm:py-20"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         {/* HEADER */}
//         <div className="text-center mb-10 sm:mb-14">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
//             Our Learning Plans
//           </h2>
//           <p className="mt-3 sm:mt-4 text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
//             Structured, beginner-friendly learning paths designed for kids and
//             teens to master coding and academics step by step.
//           </p>
//         </div>

//         {/* CODING LABS */}
//         <div className="mb-12 sm:mb-14">
//           <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 sm:mb-6">
//             Coding Labs
//           </h3>

//           {/* BLOCK BASED */}
//           <h4 className="text-base sm:text-lg font-semibold text-orange-500 mb-4">
//             Block-Based Learning
//           </h4>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//             {codingBlock.map((item, i) => (
//               <Card
//                 key={i}
//                 item={item}
//                 onSelectTopic={onSelectTopic}
//                 onOpenCurriculum={(image) => setSelectedCurriculum({ image })}
//               />
//             ))}
//           </div>

//           {/* TEXT BASED */}
//           <h4 className="text-base sm:text-lg font-semibold text-orange-500 mt-10 sm:mt-12 mb-4">
//             Text-Based Learning
//           </h4>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//             {codingText.map((item, i) => (
//               <Card
//                 key={i}
//                 item={item}
//                 onSelectTopic={onSelectTopic}
//                 onOpenCurriculum={(image) => setSelectedCurriculum({ image })}
//               />
//             ))}
//           </div>
//         </div>

//         {/* ACADEMIC */}
//         <div>
//           <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-5 sm:mb-6">
//             Academic Support
//           </h3>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//             {academic.map((item, i) => (
//               <Card key={i} item={item} onSelectTopic={onSelectTopic} />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
