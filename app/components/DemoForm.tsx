"use client";

import { useEffect, useState } from "react";
import { handleSubmit } from "../handlers/handleSubmit";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function DemoForm({ selectedTopic }: { selectedTopic: string }) {
  const [form, setForm] = useState({
    parent: "",
    child: "",
    grade: "",
    mobile: "",
    email: "",
    topic: "",
    date: "",
    time: "",
  });

  // ✅ Auto-fill topic safely (DON'T overwrite manual changes)
  useEffect(() => {
    if (selectedTopic) {
      setForm((prev) => {
        // only update if user hasn't manually selected something else
        if (!prev.topic || prev.topic !== selectedTopic) {
          return {
            ...prev,
            topic: selectedTopic,
          };
        }
        return prev;
      });
    }
  }, [selectedTopic]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="demo"
      className="bg-white py-12 sm:py-16 md:py-24 scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Book a Free Demo
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-600 text-sm sm:text-base">
            Fill the form and our team will contact you shortly.
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={(e) => handleSubmit(e, form, setForm)}
          className="mt-8 sm:mt-10 bg-[#F9FAFB] p-5 sm:p-8 rounded-2xl shadow-sm"
        >
          <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
            {/* Parent */}
            <input
              type="text"
              name="parent"
              placeholder="Parent Name"
              value={form.parent}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

            {/* Child */}
            <input
              type="text"
              name="child"
              placeholder="Child Name"
              value={form.child}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

            {/* Grade */}
            <select
              name="grade"
              value={form.grade}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            >
              <option value="">Select Grade</option>
              {[...Array(8)].map((_, i) => (
                <option key={i} value={`Grade ${i + 1}`}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
            {/* Country Code + Mobile */}
            <PhoneInput
              international
              defaultCountry="IN"
              placeholder="Parent's WhatsApp Number"
              value={form.mobile}
              onChange={(value) =>
                setForm({
                  ...form,
                  mobile: value || "",
                })
              }
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
            />

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

            {/* Topic */}
            <div className="md:col-span-2">
              <select
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
                required
              >
                <option value="">Select Topic to Study</option>

                <optgroup label="Coding Labs - Block Based">
                  <option value="Scratch Programming">
                    Scratch Programming
                  </option>
                  <option value="App Development">App Development</option>
                  <option value="AI / ML">AI / ML</option>
                </optgroup>

                <optgroup label="Coding Labs - Text Based">
                  <option value="Web Development">Web Development</option>
                  <option value="Python & Data Science">
                    Python & Data Science
                  </option>
                </optgroup>

                <optgroup label="Academic Support">
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                </optgroup>
              </select>
            </div>

            {/* Date */}
            <label className="block sm:hidden text-sm font-medium text-gray-700 mb-2">
              Preferred Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />

            {/* Time */}
            <label className="block sm:hidden text-sm font-medium text-gray-700 mb-2">
              Preferred Time
            </label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none"
              required
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition cursor-pointer"
          >
            Book Free Demo
          </button>
        </form>
      </div>
    </section>
  );
}
