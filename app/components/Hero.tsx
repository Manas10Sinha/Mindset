"use client";

import Image from "next/image";
import { scrollToId } from "../handlers/scrollTo";

export default function Hero() {
  return (
    <section id="home" className="relative bg-[#F9FAFB] overflow-hidden">
      <div className="bg-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          {/* LEFT CONTENT */}
          <div className="text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug md:leading-tight">
              Ignite Your Child's{" "}
              <span className="text-orange-500">Creativity</span> with Coding,
              Maths & Science
            </h1>

            <p className="mt-5 sm:mt-6 text-gray-600 text-base sm:text-lg">
              Help your child develop problem-solving skills, logical thinking,
              and creativity through our engaging STEM programs.
            </p>

            <button
              onClick={() => scrollToId("demo")}
              className="mt-6 sm:mt-8 bg-orange-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-orange-600 transition w-full sm:w-auto cursor-pointer"
            >
              Book a Free Demo
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center mt-6 md:mt-0">
            <Image
              src="/kidsLearning.png"
              alt="kids learning"
              width={500}
              height={400}
              className="w-full max-w-[320px] sm:max-w-100 md:max-w-125 h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
