"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "How Sulio AI helped Benoit Loisel triple their sales in 6 months. With AI matching, they experienced a 25% higher conversion rate and saved 10 hours/week on client interactions.",
      author: "Benoit Loisel",
    },
    {
      text: "Using Sulio AI transformed our client engagement. We saw a 30% increase in response rates and saved 12 hours/week on manual tasks.",
      author: "Sarah Chen",
    },
    {
      text: "Sulio AI's matching algorithm helped us reach perfect-fit clients. Our conversion rate improved by 28% and we saved 8 hours/week.",
      author: "Mark Johnson",
    },
  ];

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="w-full bg-black py-20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Title Section */}
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black text-white leading-tight mb-4">
            Reports won't be replaced by AI,
          </h2>
          <h2 className="text-6xl font-black leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">
              but by those who use it.
            </span>
          </h2>
        </div>

        {/* Testimonial Section with Side Images */}
        <div className="grid grid-cols-12 gap-8 items-center">
          {/* Left Decorative Image */}
          <div className="col-span-2 flex justify-center">
            <div className="relative w-full max-w-[180px] aspect-square">
              <Image
                src="/images/1.png"
                alt="Decoration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Center - Testimonial Carousel */}
          <div className="col-span-8 relative">
            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all"
              aria-label="Previous testimonial"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all"
              aria-label="Next testimonial"
            >
              <svg
                className="w-6 h-6 text-gray-800"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Testimonial Box with Sliding Animation */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-3xl p-12 shadow-2xl border-4 border-gray-200 min-h-[200px] flex items-center justify-center">
                      {/* Large Quote Marks */}
                      <div className="relative w-full">
                        <div className="absolute -top-6 -left-4 text-8xl text-gray-300 font-serif leading-none">
                          "
                        </div>
                        <div className="absolute -bottom-6 -right-4 text-8xl text-gray-300 font-serif leading-none">
                          "
                        </div>

                        {/* Testimonial Content */}
                        <div className="relative px-8 py-4">
                          <p className="text-xl text-gray-800 leading-relaxed text-center mb-6">
                            {testimonial.text.split(testimonial.author)[0]}
                            <span className="font-black">
                              {testimonial.author}
                            </span>
                            {testimonial.text.split(testimonial.author)[1]}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-green-500 w-8"
                      : "bg-gray-400 w-3 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Decorative Image */}
          <div className="col-span-2 flex justify-center">
            <div className="relative w-full max-w-[180px] aspect-square">
              <Image
                src="/images/3.png"
                alt="Decoration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
