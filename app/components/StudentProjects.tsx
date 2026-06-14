"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  Users,
  Code2,
  Smartphone,
  Globe,
  Bot,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Student projects data - Add your real projects here
const studentProjects = [
  {
    id: 1,
    title: "Maze Game",
    studentName: "Aarav Sharma",
    age: 12,
    course: "Scratch Programming",
    module: "Module 1",
    image: "/thumbnail/s1.JPG",
    description:
      "Created an interactive Maze Game game with multiple levels and power-ups.",
    techStack: ["Scratch", "Game Design", "Animation"],
    rating: 5,
    link: "https://scratch.mit.edu/projects/1151585409",
  },
  {
    id: 2,
    title: "AI Friend Giga",
    studentName: "Iyer",
    age: 13,
    course: "Scratch Programming",
    module: "Module 1",
    image: "/thumbnail/s2.JPG",
    description: "Built a AI Friend Giga this is a chat bot.",
    techStack: ["Scratch", "Game Design", "UI Design"],
    rating: 5,
    link: "https://scratch.mit.edu/projects/704206035",
  },
  {
    id: 3,
    title: "Catch The Theif",
    studentName: "Ananya Patel",
    age: 9,
    course: "Scratch Programming",
    module: "Module 1",
    image: "/thumbnail/s3.JPG",
    description:
      "Created an AI model that detects faces and expressions in real-time.",
    techStack: ["Scratch", "Game Design", "UI Design"],
    rating: 5,
    link: "https://scratch.mit.edu/projects/698179146",
  },
  //   {
  //     id: 4,
  //     title: "Portfolio Website",
  //     studentName: "Rohan Verma",
  //     age: 15,
  //     course: "Web Development",
  //     module: "Module 4",
  //     image: "/projects/portfolio.jpg",
  //     description:
  //       "Designed and developed a personal portfolio website with animations.",
  //     techStack: ["HTML", "CSS", "JavaScript", "GSAP"],
  //     rating: 4,
  //   },
  //   {
  //     id: 5,
  //     title: "Data Visualization Dashboard",
  //     studentName: "Krishna Nair",
  //     age: 16,
  //     course: "Python & Data Science",
  //     module: "Module 5",
  //     image: "/projects/dashboard.jpg",
  //     description:
  //       "Created interactive dashboards to visualize complex data sets.",
  //     techStack: ["Python", "Pandas", "Plotly", "Data Analysis"],
  //     rating: 5,
  //   },
  //   {
  //     id: 6,
  //     title: "Calculator App",
  //     studentName: "Sahana",
  //     age: 10,
  //     course: "Mathematics",
  //     module: "Academic",
  //     image: "/projects/calculator.jpg",
  //     description:
  //       "Built a fully functional calculator with scientific functions.",
  //     techStack: ["HTML", "CSS", "JavaScript", "Logic Building"],
  //     rating: 4,
  //   },
];

// Star Rating Component
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

// Carousel Project Card
function CarouselCard({ project }: { project: (typeof studentProjects)[0] }) {
  const getCourseColor = () => {
    if (project.course.includes("Scratch"))
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    if (project.course.includes("App"))
      return "border-blue-200 bg-blue-50 text-blue-700";
    if (project.course.includes("AI"))
      return "border-purple-200 bg-purple-50 text-purple-700";
    if (project.course.includes("Web"))
      return "border-orange-200 bg-orange-50 text-orange-700";
    if (project.course.includes("Python"))
      return "border-cyan-200 bg-cyan-50 text-cyan-700";
    return "border-gray-200 bg-gray-50 text-gray-700";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
      {/* Project Image */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src={project.image} alt="hh" width={280} height={250} />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{project.title}</h3>
            <p className="text-sm text-gray-500">
              by {project.studentName} • Age {project.age}
            </p>
          </div>
          <StarRating rating={project.rating} />
        </div>

        <div
          className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-3 ${getCourseColor()}`}
        >
          {project.course} • {project.module}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-2">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-md text-sm font-medium hover:bg-orange-600 transition"
            aria-label={`Open ${project.title} project`}
          >
            View Project
          </a>
        </div>
      </div>
    </div>
  );
}

// Main Carousel Component
export default function StudentProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Calculate cards per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(studentProjects.length / cardsPerView);
  const startIndex = currentIndex * cardsPerView;
  const visibleProjects = studentProjects.slice(
    startIndex,
    startIndex + cardsPerView,
  );

  const nextSlide = () => {
    if (isAnimating || currentIndex >= totalPages - 1) return;
    setIsAnimating(true);

    gsap.to(carouselRef.current, {
      x: -100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex(currentIndex + 1);
        gsap.fromTo(
          carouselRef.current,
          { x: 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            onComplete: () => setIsAnimating(false),
          },
        );
      },
    });
  };

  const prevSlide = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);

    gsap.to(carouselRef.current, {
      x: 100,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        setCurrentIndex(currentIndex - 1);
        gsap.fromTo(
          carouselRef.current,
          { x: -100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            onComplete: () => setIsAnimating(false),
          },
        );
      },
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full mb-4">
            <Users size={14} className="text-orange-600" />
            <span className="text-xs font-medium text-orange-600">
              Student Showcase
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Our Students' Creations
          </h2>
          <div className="w-16 h-0.5 bg-orange-500 mx-auto mt-3 mb-4 rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto text-sm">
            See what our young innovators have built.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {currentIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-orange-50 hover:border-orange-300 transition-all"
            >
              <ChevronLeft size={20} className="text-gray-600" />
            </button>
          )}

          {currentIndex < totalPages - 1 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-orange-50 hover:border-orange-300 transition-all"
            >
              <ChevronRight size={20} className="text-gray-600" />
            </button>
          )}

          {/* Carousel Content */}
          <div
            ref={carouselRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300"
          >
            {visibleProjects.map((project) => (
              <CarouselCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(totalPages)].map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  gsap.to(carouselRef.current, {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                      setCurrentIndex(idx);
                      gsap.fromTo(
                        carouselRef.current,
                        { opacity: 0 },
                        {
                          opacity: 1,
                          duration: 0.2,
                          onComplete: () => setIsAnimating(false),
                        },
                      );
                    },
                  });
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-orange-500" : "w-2 bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}

        {/* Counter */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            Showing {startIndex + 1} -{" "}
            {Math.min(startIndex + cardsPerView, studentProjects.length)} of{" "}
            {studentProjects.length} projects
          </p>
        </div>

        {/* Testimonial Note */}
        <div className="mt-10 text-center p-6 bg-white rounded-xl border border-gray-100">
          <p className="text-gray-600 text-sm italic">
            "My son built his first game in just 2 months! The progress has been
            amazing."
          </p>
          <p className="text-xs text-gray-400 mt-2">
            — Parent of Aarav, Scratch Student
          </p>
        </div>
      </div>
    </section>
  );
}
