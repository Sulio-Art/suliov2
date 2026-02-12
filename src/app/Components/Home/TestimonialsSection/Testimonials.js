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
    <div className="w-full bg-white pb-10">
      <div className="grid grid-cols-12 items-stretch w-full h-[240px] md:h-[300px]">
        <div className="col-span-2 relative overflow-hidden">
          <Image
            src="/images/1.png"
            alt="Decoration Left"
            fill
            sizes="17vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="col-span-8 relative flex items-center px-4 md:px-12">
          <div
            className="relative w-full flex items-center bg-white px-10 md:px-20 py-10 md:py-14"
            style={{ border: "7px solid #4A3728" }}
          >
            <div
              className="absolute bg-white px-2"
              style={{
                left: "-1.8rem",
                top: "35%",
                transform: "translateY(-50%)",
              }}
            >
              <span className="text-[#4A3728] font-serif font-black text-6xl md:text-8xl leading-[0]">
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
                    <p className="text-lg md:text-xl lg:text-2xl text-gray-900 leading-relaxed font-medium">
                      {t.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="absolute bg-white px-2"
              style={{
                right: "-1.8rem",
                bottom: "35%",
                transform: "translateY(50%)",
              }}
            >
              <span className="text-[#4A3728] font-serif font-black text-6xl md:text-8xl leading-[0]">
                &#8221;
              </span>
            </div>
          </div>
        </div>

        <div className="col-span-2 relative overflow-hidden">
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

      <div className="flex justify-center items-center gap-4 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`transition-all duration-300 rounded-full border-2 border-black ${
              currentIndex === index
                ? "bg-[#00A859] border-[#00A859] w-5 h-5 md:w-6 md:h-6"
                : "bg-transparent w-3 h-3 md:w-4 md:h-4"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
