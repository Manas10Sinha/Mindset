"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Mail } from "lucide-react";
import Image from "next/image";

// Register ScrollTrigger once (safe for client)
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SafeHands() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(contentRef.current, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="my-12 sm:my-16 md:my-20 mx-4 sm:mx-6 lg:mx-auto max-w-7xl"
    >
      <div
        ref={contentRef}
        className="bg-gradient-to-b from-white to-orange-50 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 border border-orange-100"
      >
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
          {/* LEFT SIDE: Image */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
              <Image
                src="/money.webp"
                alt="100% Money Back Guarantee"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* RIGHT SIDE: Text */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Your Trust, Our Commitment
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-4">
              At <span className="font-semibold text-orange-600">Mindset</span>,
              we are passionate about your child’s success. Therefore, we offer
              a{" "}
              <strong className="text-orange-600">
                100% money‑back guarantee
              </strong>
              . If we do not meet your expectations, you have the right to
              cancel your purchase and get your money back. It’s as simple as
              that.
            </p>
            <p className="text-gray-700 text-base sm:text-lg mb-6">
              If at any point you feel that you wish to discontinue using
              Mindset, please email us at{" "}
              <a
                href="mailto:mindset2305@gmail.com"
                className="text-orange-600 font-semibold hover:underline break-all"
              >
                mindset2305@gmail.com
              </a>{" "}
              and we will immediately process your refund for the remaining
              lessons/classes – no questions asked.
            </p>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
              <Mail className="w-4 h-4" />
              <span className="text-sm font-medium">mindset2305@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
