"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { scrollToId } from "../handlers/scrollTo";
import gsap from "gsap";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const burgerLinesRef = useRef<(HTMLSpanElement | null)[]>([]);

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

  // GSAP animation for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      // Animate menu opening
      gsap.to(mobileMenuRef.current, {
        duration: 0.4,
        x: 0,
        opacity: 1,
        ease: "power2.out",
      });

      // Stagger animation for menu items
      gsap.fromTo(
        menuItemsRef.current.filter(Boolean),
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: "back.out(0.8)",
          delay: 0.1,
        },
      );

      // Animate burger to X
      if (
        burgerLinesRef.current[0] &&
        burgerLinesRef.current[1] &&
        burgerLinesRef.current[2]
      ) {
        gsap.to(burgerLinesRef.current[0], {
          rotate: 45,
          y: 8,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(burgerLinesRef.current[1], {
          opacity: 0,
          duration: 0.2,
        });
        gsap.to(burgerLinesRef.current[2], {
          rotate: -45,
          y: -8,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    } else {
      // Animate menu closing
      gsap.to(mobileMenuRef.current, {
        duration: 0.3,
        x: "100%",
        opacity: 0,
        ease: "power2.in",
      });

      // Reset burger icon
      if (
        burgerLinesRef.current[0] &&
        burgerLinesRef.current[1] &&
        burgerLinesRef.current[2]
      ) {
        gsap.to(burgerLinesRef.current[0], {
          rotate: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(burgerLinesRef.current[1], {
          opacity: 1,
          duration: 0.2,
          delay: 0.1,
        });
        gsap.to(burgerLinesRef.current[2], {
          rotate: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }
  }, [mobileMenuOpen]);

  // Handle click on menu item
  const handleMenuItemClick = (id: string) => {
    scrollToId(id);
    setMobileMenuOpen(false);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav className="w-full bg-white/90 backdrop-blur border-b shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => scrollToId("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src="/logo1.png"
              alt="logo"
              width={200}
              height={200}
              className="w-[150px] sm:w-[200px] md:w-[250px] h-auto"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 lg:gap-8 font-medium">
            {[
              { id: "home", label: "Home" },
              { id: "why", label: "Why Us?" },
              { id: "plans", label: "Our Plans" },
              { id: "faq", label: "FAQ" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className={`cursor-pointer transition-all duration-300 ${
                  active === item.id
                    ? "text-orange-500 font-semibold"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <button
            onClick={() => scrollToId("demo")}
            className="hidden sm:inline-flex bg-orange-500 text-white px-4 sm:px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 cursor-pointer hover:scale-105 text-sm sm:text-base"
          >
            TRY A FREE LESSON
          </button>

          {/* Mobile Burger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-50"
            aria-label="Toggle menu"
          >
            <span
              ref={(el) => {
                burgerLinesRef.current[0] = el;
              }}
              className="w-6 h-0.5 bg-gray-800 transition-all duration-300 origin-center"
            />
            <span
              ref={(el) => {
                burgerLinesRef.current[1] = el;
              }}
              className="w-6 h-0.5 bg-gray-800 transition-all duration-300"
            />
            <span
              ref={(el) => {
                burgerLinesRef.current[2] = el;
              }}
              className="w-6 h-0.5 bg-gray-800 transition-all duration-300 origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed top-0 right-0 w-full h-full bg-white z-40 md:hidden shadow-2xl"
        style={{
          transform: "translateX(100%)",
          opacity: 0,
          visibility: mobileMenuOpen ? "visible" : "hidden",
        }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6">
          {/* Mobile Menu Items */}
          {[
            { id: "home", label: "Home" },
            { id: "why", label: "Why Us?" },
            { id: "plans", label: "Our Plans" },
            { id: "demo", label: "Demo" },
            { id: "faq", label: "FAQ" },
          ].map((item, index) => (
            <button
              key={item.id}
              ref={(el) => {
                menuItemsRef.current[index] = el;
              }}
              onClick={() => handleMenuItemClick(item.id)}
              className={`text-2xl font-semibold py-3 transition-all duration-300 ${
                active === item.id
                  ? "text-orange-500"
                  : "text-gray-700 hover:text-orange-500"
              }`}
            >
              {item.label}
            </button>
          ))}

          {/* Mobile CTA Button */}
          <button
            ref={(el) => {
              menuItemsRef.current[4] = el;
            }}
            onClick={() => handleMenuItemClick("demo")}
            className="mt-4 bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all duration-300 text-lg hover:scale-105"
          >
            TRY A FREE LESSON
          </button>
        </div>
      </div>
    </>
  );
}
// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { scrollToId } from "../handlers/scrollTo";

// export default function Navbar() {
//   const [active, setActive] = useState("home");

//   const sections = ["home", "why", "plans", "demo", "faq"];

//   // 🔥 Detect active section on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       let current = "home";

//       sections.forEach((id) => {
//         const section = document.getElementById(id);
//         if (section) {
//           const top = section.offsetTop - 100;
//           if (window.scrollY >= top) {
//             current = id;
//           }
//         }
//       });

//       setActive(current);
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <nav className="w-full bg-white/90 backdrop-blur border-b shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
//         {/* Logo */}
//         <div
//           onClick={() => scrollToId("home")}
//           className="flex items-center gap-2 cursor-pointer"
//         >
//           <Image src="/logo1.png" alt="logo" width={250} height={250} />
//         </div>

//         {/* Menu */}
//         <div className="hidden md:flex gap-8 font-medium">
//           {[
//             { id: "home", label: "Home" },
//             { id: "why", label: "Why Us?" },
//             { id: "plans", label: "Our Plans" },
//             { id: "faq", label: "FAQ" },
//           ].map((item) => (
//             <button
//               key={item.id}
//               onClick={() => scrollToId(item.id)}
//               className={`cursor-pointer transition ${
//                 active === item.id
//                   ? "text-orange-500 font-semibold"
//                   : "text-gray-600 hover:text-orange-500"
//               }`}
//             >
//               {item.label}
//             </button>
//           ))}
//         </div>

//         {/* CTA */}
//         <button
//           onClick={() => scrollToId("demo")}
//           className="hidden sm:inline-flex bg-orange-500 text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition cursor-pointer"
//         >
//           TRY A FREE LESSON
//         </button>
//       </div>
//     </nav>
//   );
// }
