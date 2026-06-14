"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { scrollToId } from "../handlers/scrollTo";
import { Video, Users, BarChart2, Zap } from "lucide-react";

type Feature = {
  id: string;
  Icon: React.ComponentType<
    React.SVGProps<SVGSVGElement> & { size?: number; className?: string }
  >;
  text: string;
};

const FEATURES: Feature[] = [
  {
    id: "video",
    Icon: Video,
    text: "Live 1:1 & small-group coding sessions with project‑based learning",
  },
  {
    id: "instructors",
    Icon: Users,
    text: "Expert instructors with 15+ years of combined experience from top ed‑tech & engineering firms",
  },
  {
    id: "progress",
    Icon: BarChart2,
    text: "Personalized weekly progress reports & portfolio of completed projects",
  },
];

const STATS = [
  { label: "Students", value: "50,000+" },
  { label: "Countries", value: "30+" },
];

function FeatureItem({ Icon, text }: { Icon: Feature["Icon"]; text: string }) {
  return (
    <li className="flex items-center gap-3">
      <span className="flex items-center justify-center w-8 h-8 bg-white rounded-full text-orange-500 shadow-sm">
        <Icon size={16} aria-hidden="true" />
      </span>
      <span className="text-gray-700 text-sm sm:text-base">{text}</span>
    </li>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const underline1Ref = useRef<HTMLSpanElement>(null);
  const underline2Ref = useRef<HTMLSpanElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const featuresListRef = useRef<HTMLUListElement>(null);
  const buttonsContainerRef = useRef<HTMLDivElement>(null);
  const primaryButtonRef = useRef<HTMLButtonElement>(null);
  const zapLineRef = useRef<HTMLHeadingElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gradientBgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const featureItems = featuresListRef.current
        ? Array.from(featuresListRef.current.children)
        : [];

      const isMobile = window.innerWidth < 640;
      const shakeX = isMobile ? 6 : 10;
      const shakeY = isMobile ? 3 : 5;
      const scaleUp = isMobile ? 1.1 : 1.2;
      const floatDistance = isMobile ? 8 : 12;

      gsap.set(headingRef.current, { opacity: 0, y: 40 });
      gsap.set(underline1Ref.current, { scaleX: 0, transformOrigin: "left" });
      gsap.set(underline2Ref.current, { scaleX: 0, transformOrigin: "left" });
      gsap.set(paragraphRef.current, { opacity: 0, y: 30 });
      gsap.set(featureItems, { opacity: 0, x: -20 });
      gsap.set(buttonsContainerRef.current, { opacity: 0, y: 30 });
      gsap.set(zapLineRef.current, { opacity: 0, scale: 0.9 });
      gsap.set(statsContainerRef.current, { opacity: 0, y: 20 });
      gsap.set(imageRef.current, { opacity: 0, scale: 0.92, y: 20 });

      const tl = gsap.timeline({
        defaults: { duration: 0.7, ease: "power3.out" },
      });
      tl.to(headingRef.current, { opacity: 1, y: 0, duration: 0.8 })
        .to(
          underline1Ref.current,
          { scaleX: 1, duration: 0.5, ease: "back.out(1.2)" },
          "-=0.3",
        )
        .to(
          underline2Ref.current,
          { scaleX: 1, duration: 0.5, ease: "back.out(1.2)" },
          "-=0.2",
        )
        .to(paragraphRef.current, { opacity: 1, y: 0 }, "-=0.3")
        .to(featureItems, { opacity: 1, x: 0, stagger: 0.1 }, "-=0.2")
        .to(buttonsContainerRef.current, { opacity: 1, y: 0 }, "-=0.2")
        .to(zapLineRef.current, { opacity: 1, scale: 1 }, "-=0.3")
        .to(statsContainerRef.current, { opacity: 1, y: 0 }, "-=0.2")
        .to(
          imageRef.current,
          { opacity: 1, scale: 1, y: 0, duration: 0.9 },
          "-=0.5",
        );

      if (primaryButtonRef.current) {
        const crazyTimeline = gsap.timeline({ repeat: -1, repeatDelay: 2 });
        crazyTimeline
          .to(primaryButtonRef.current, {
            x: `+=${shakeX}`,
            y: `+=${shakeY}`,
            rotation: 3,
            skewX: 5,
            duration: 0.08,
            ease: "none",
          })
          .to(primaryButtonRef.current, {
            x: `-=${shakeX * 2}`,
            y: `-=${shakeY * 2}`,
            rotation: -6,
            skewX: -10,
            duration: 0.08,
            ease: "none",
          })
          .to(primaryButtonRef.current, {
            x: `+=${shakeX}`,
            y: `+=${shakeY}`,
            rotation: 3,
            skewX: 5,
            duration: 0.08,
            ease: "none",
          })
          .to(primaryButtonRef.current, {
            x: 0,
            y: 0,
            rotation: 0,
            skewX: 0,
            duration: 0.08,
            ease: "none",
          })
          .to(primaryButtonRef.current, {
            scale: scaleUp,
            backgroundColor: "#ff8c42",
            boxShadow: "0 0 20px 5px rgba(255, 100, 0, 0.9)",
            duration: 0.15,
            ease: "back.out(1.2)",
          })
          .to(primaryButtonRef.current, {
            scale: 1,
            rotation: 5,
            backgroundColor: "#f97316",
            duration: 0.2,
            ease: "bounce.out",
          })
          .to(primaryButtonRef.current, {
            rotation: 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            duration: 0.25,
            ease: "elastic.out(1, 0.3)",
          });
      }

      gsap.to(imageRef.current, {
        y: `+=${floatDistance}`,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 0.5,
      });

      if (gradientBgRef.current) {
        gsap.to(gradientBgRef.current, {
          backgroundPosition: "100% 50%",
          duration: 12,
          repeat: -1,
          yoyo: true,
          ease: "none",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative bg-[#F9FAFB] overflow-hidden"
    >
      <div
        ref={gradientBgRef}
        className="absolute inset-0 bg-gradient-to-r from-orange-100 via-white to-orange-100 opacity-60"
        style={{ backgroundSize: "200% 100%" }}
      />

      <div className="relative bg-gradient-to-b from-orange-100/30 to-white pt-4 pb-6 sm:pt-6 sm:pb-8 md:pt-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 lg:gap-16">
            <div className="text-center md:text-left">
              {/* FIXED HEADING – 3 clean lines on mobile */}
              <h1
                ref={headingRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight max-w-xl mx-auto md:mx-0"
              >
                {/* Line 1: Learn coding & AI (no wrap) */}
                <span className="block whitespace-nowrap overflow-x-auto pb-1">
                  Learn{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">coding &amp; AI</span>
                    <span
                      ref={underline1Ref}
                      className="absolute bottom-0 left-0 w-full h-[3px] sm:h-[4px] bg-orange-500 origin-left"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                </span>
                {/* Line 2: Become an innovator */}
                <span className="block mt-2">Become an innovator</span>
                {/* Line 3: Ages 5–14 */}
                <span className="block text-gray-700 text-base sm:text-xl md:text-2xl mt-2 sm:mt-3">
                  Ages{" "}
                  <span className="relative inline-block">
                    <span className="relative z-10">5–14</span>
                    <span
                      ref={underline2Ref}
                      className="absolute bottom-0 left-0 w-full h-[3px] sm:h-[4px] bg-orange-500 origin-left"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </span>
                </span>
              </h1>

              <p
                ref={paragraphRef}
                className="mt-4 sm:mt-6 text-gray-600 text-sm sm:text-base md:text-lg max-w-md mx-auto md:mx-0"
              >
                Help your child develop problem-solving skills, logical
                thinking, and creativity through our engaging STEM programs.
              </p>

              <ul
                ref={featuresListRef}
                className="mt-5 sm:mt-6 space-y-2 sm:space-y-3 max-w-md mx-auto md:mx-0"
              >
                {FEATURES.map((f) => (
                  <FeatureItem key={f.id} Icon={f.Icon} text={f.text} />
                ))}
              </ul>

              <div
                ref={buttonsContainerRef}
                className="flex flex-col sm:flex-row items-center justify-center md:justify-start mt-6 sm:mt-8 gap-3 sm:gap-4"
              >
                <button
                  ref={primaryButtonRef}
                  type="button"
                  onClick={() => scrollToId("demo")}
                  aria-label="Book a free demo"
                  className="bg-orange-500 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer text-sm sm:text-base"
                >
                  TRY A FREE LESSON
                </button>
                <button
                  type="button"
                  onClick={() => scrollToId("plans")}
                  aria-label="Explore courses"
                  className="bg-white text-orange-500 border-2 border-orange-500 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 cursor-pointer text-sm sm:text-base"
                >
                  Explore Courses
                </button>
              </div>

              <h2
                ref={zapLineRef}
                className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg font-medium text-gray-800"
              >
                <Zap className="inline mr-2 text-orange-500" size={16} />
                Join 100+ students who took a lesson in the last 24 hours!
              </h2>

              <div
                ref={statsContainerRef}
                className="mt-5 sm:mt-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-md p-4 sm:p-6 border border-orange-100"
              >
                <div className="flex flex-col sm:flex-row justify-around items-center gap-4 sm:gap-6">
                  {STATS.map((stat) => (
                    <div
                      key={stat.label}
                      className="text-center w-full sm:w-auto"
                    >
                      <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-600">
                        {stat.value}
                      </div>
                      <div className="text-sm sm:text-base font-medium text-gray-600 mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={imageRef} className="flex justify-center mt-6 md:mt-0">
              <div className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[440px] lg:max-w-[500px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/40 to-transparent rounded-2xl blur-2xl -z-10 transform scale-105" />
                <Image
                  src="/kidsLearning.png"
                  alt="Kids learning and coding together"
                  width={500}
                  height={400}
                  className="w-full h-auto drop-shadow-xl rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
