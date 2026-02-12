import React from "react";
import { Button } from "../../ui/button";
import Link from "next/link";

export default function MarketingStats() {
  const stats = [
    {
      number: "1M+",
      text: "Personalized messages sent to art buyers and fans.",
    },
    {
      number: "85%",
      text: "Increase in client engagement through AI-powered matching.",
    },
    {
      number: "70%",
      text: "Of users say Sulio AI helped them reduce admin time by at least a quarter.",
    },
    {
      number: "50+",
      text: "Industries successfully transformed with personalized AI solutions.",
    },
  ];

  return (
    <div className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats Section */}
        <section className="mb-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center transform hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4">
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 mb-2">
                    {stat.number}
                  </div>
                </div>
                <p className="text-sm lg:text-base text-gray-700 leading-snug font-medium px-2">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section - Updated to match Figma */}
        <section className="mt-16">
          <div className="bg-black rounded-3xl py-12 lg:py-16 px-8 lg:px-16 shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              {/* Left Content */}
              <div className="text-center lg:text-left lg:max-w-2xl">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4 leading-tight">
                  Ready to get started?
                </h2>
                <p className="text-base lg:text-lg xl:text-xl text-gray-300 leading-relaxed">
                  Start today and see up to{" "}
                  <span className="font-black text-orange-500">
                    40% time-saving
                  </span>{" "}
                  on client interactions in the first month!
                </p>
              </div>

              {/* Right Button */}
              <div className="flex flex-col items-center gap-4 flex-shrink-0">
                <Link href="#navbar">
                  <Button className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 hover:from-yellow-500 hover:via-orange-500 hover:to-orange-600 text-black font-black py-6 px-16 lg:py-8 lg:px-20 rounded-full text-xl lg:text-2xl xl:text-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl whitespace-nowrap">
                    Try for Free
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-base lg:text-lg text-gray-400 font-medium">
                    30 days free trial
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
