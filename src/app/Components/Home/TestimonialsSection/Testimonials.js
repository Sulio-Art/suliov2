"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      content: (
        <>
          How Sulio AI helped <span className="font-bold">Benoit Loisel</span>{" "}
          triple their sales in 6 months. With AI matching, they experienced a{" "}
          <span className="font-bold underline decoration-[3px] underline-offset-[4px]">
            25%
          </span>{" "}
          higher conversion rate and saved{" "}
          <span className="font-bold underline decoration-[3px] underline-offset-[4px]">
            10 hours/week
          </span>{" "}
          on client interactions.
        </>
      ),
    },
    {
      content: (
        <>
          Using Sulio AI transformed our client engagement. We saw a{" "}
          <span className="font-bold underline decoration-[3px] underline-offset-[4px]">
            30%
          </span>{" "}
          increase in response rates and saved{" "}
          <span className="font-bold underline decoration-[3px] underline-offset-[4px]">
            12 hours/week
          </span>{" "}
          on manual tasks with <span className="font-bold">Sarah Chen</span>.
        </>
      ),
    },
    {
      content: (
        <>
          Sulio AI completely changed how we handle outreach.{" "}
          <span className="font-bold">Marcus Rivera</span> saw a{" "}
          <span className="font-bold underline decoration-[3px] underline-offset-[4px]">
            40%
          </span>{" "}
          boost in qualified leads and saved{" "}
          <span className="font-bold underline decoration-[3px] underline-offset-[4px]">
            15 hours/week
          </span>{" "}
          across his team.
        </>
      ),
    },
  ];

  const handleDotClick = (index) => setCurrentIndex(index);

  return (
    <div className="w-full bg-white pb-10 overflow-hidden">
      {/* Container: Stacked on mobile, grid on tablet/desktop */}
      <div className="flex flex-col md:grid md:grid-cols-12 items-center md:items-stretch w-full min-h-[300px] md:h-[350px] lg:h-[300px]">
        {/* Left Decoration - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:block md:col-span-2 relative overflow-hidden">
          <Image
            src="/images/1.png"
            alt="Decoration Left"
            fill
            sizes="17vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Main Content Box */}
        <div className="col-span-12 md:col-span-8 relative flex items-center px-6 md:px-10 lg:px-12 py-8 md:py-0">
          <div
            className="relative w-full flex items-center bg-white px-6 md:px-12 lg:px-20 py-10 md:py-14"
            style={{ border: "7px solid #4A3728" }}
          >
            {/* Left Quote - Adjusted position for mobile */}
            <div
              className="absolute bg-white px-1 md:px-2"
              style={{
                left: "-1.2rem",
                top: "20%",
                transform: "translateX(0)",
              }}
            >
              <span className="text-[#4A3728] font-serif font-black text-5xl md:text-7xl lg:text-8xl leading-none">
                &#8220;
              </span>
            </div>

            <div className="w-full overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonials.map((t, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <p className="text-base md:text-lg lg:text-2xl text-gray-900 leading-relaxed font-medium">
                      {t.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Quote - Adjusted position for mobile */}
            <div
              className="absolute bg-white px-1 md:px-2"
              style={{
                right: "-1.2rem",
                bottom: "20%",
                transform: "translateX(0)",
              }}
            >
              <span className="text-[#4A3728] font-serif font-black text-5xl md:text-7xl lg:text-8xl leading-none">
                &#8221;
              </span>
            </div>
          </div>
        </div>

        {/* Right Decoration - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:block md:col-span-2 relative overflow-hidden">
          <Image
            src="/images/3.png"
            alt="Decoration Right"
            fill
            sizes="17vw"
            className="object-cover object-bottom"
            style={{ objectPosition: "center 16px" }}
            priority
          />
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-3 md:gap-4 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full border-2 border-black ${
              currentIndex === index
                ? "bg-[#00A859] border-[#00A859] w-4 h-4 md:w-6 md:h-6"
                : "bg-transparent w-2.5 h-2.5 md:w-4 md:h-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
