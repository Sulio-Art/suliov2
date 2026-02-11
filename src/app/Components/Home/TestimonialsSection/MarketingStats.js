import React from "react";
import Image from "next/image";
import Link from "next/link";
import Testimonials from "./Testimonials";
import { Button } from "../../ui/button";

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
    <div className="w-full bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Testimonials Section */}
        <div className="py-16">
          <Testimonials />
        </div>

        {/* Stats Section - Enhanced */}
        <section className="py-20 px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Trusted by Artists{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
                Worldwide
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of artists who are already transforming their
              workflow
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 text-center transform hover:scale-105 border-2 border-gray-100"
              >
                <div className="mb-6">
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-purple-600 mb-2">
                    {stat.number}
                  </div>
                </div>
                <p className="text-sm lg:text-base text-gray-700 leading-snug font-semibold">
                  {stat.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="pb-20 px-6 lg:px-8">
          <div className="bg-gradient-to-br from-black via-gray-900 to-black text-white rounded-3xl overflow-hidden max-w-6xl mx-auto shadow-2xl border-2 border-gray-800">
            <div className="p-10 lg:p-16 text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                  Ready to Transform{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
                    Your Workflow?
                  </span>
                </h2>
                <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
                  Unlock up to 40% time savings in the first month with Sulio AI
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-4">
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black py-7 px-12 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl text-lg lg:text-xl">
                    Start Free Trial
                  </Button>
                </Link>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-sm lg:text-base text-gray-400 font-medium">
                  ✨ No credit card required • 30 days free • Cancel anytime
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
