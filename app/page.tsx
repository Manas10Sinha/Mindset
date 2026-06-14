"use client";
import { useState } from "react";
import DemoForm from "./components/DemoForm";
import FaqSection from "./components/FaqSection";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Plans from "./components/Plans";
import WhyUs from "./components/WhyUs";
import Footer from "./components/footer";
import SafeHands from "./components/SafeHands";

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState("");
  return (
    <>
      <Navbar />
      <Hero />
      <WhyUs />
      <Plans onSelectTopic={setSelectedTopic} />
      <DemoForm selectedTopic={selectedTopic} />
      <SafeHands />
      <FaqSection />
      <Footer />
    </>
  );
}
