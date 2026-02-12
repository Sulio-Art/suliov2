import Image from "next/image";
import { Card, CardContent } from "../../ui/card";

export default function VideoIntroduction() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Header section with improved typography */}
      <div className="relative px-6 lg:px-12 pt-20 pb-12 h-auto bg-black z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center relative z-10 max-w-7xl mx-auto">
          <div className="md:col-span-8 space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              People won't be replaced by AI, but by those who use it.
            </h1>
          </div>
        </div>

        {/* GIF Overlay - desktop only - EXTENDED to bleed down more onto video */}
        <div className="hidden md:block absolute right-0 top-12 w-[420px] overflow-visible pointer-events-none z-20">
          <div className="relative w-full">
            <Image
              src="/images/section4overlay.gif"
              alt="Overlay animation"
              width={420}
              height={600}
              className="absolute top-0 right-0 w-full h-auto max-w-none drop-shadow-2xl"
              style={{
                transform: "scale(1.4)",
                transformOrigin: "top right",
              }}
            />
          </div>
        </div>

        {/* Mobile decorative icons */}
        <div className="absolute right-4 top-20 md:hidden">
          <Image
            src="/images/section4overlay.gif"
            alt="Decorative icons"
            width={160}
            height={160}
            className="w-40 drop-shadow-xl"
          />
        </div>
      </div>

      {/* Main Card Section with enhanced design */}
      <div className="container mx-auto px-6 pb-20 z-0 max-w-7xl">
        <Card className="rounded-3xl bg-gradient-to-br from-black via-gray-900 to-black text-white border-4 border-gray-800 overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-12">
              {/* Product Info */}
              <div className="md:col-span-4 md:order-2 order-1 flex flex-col justify-center p-8 lg:p-12 text-center md:text-left bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-3xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
                  Sulio Art
                  <br />
                  Artist AI Chatbot
                </h2>
                <p className="text-lg md:text-xl font-medium text-gray-200 leading-relaxed">
                  Meet Sulio Art's all-in-one product experience AI Chatbot,
                  enhanced with artificial intelligence.
                </p>
              </div>

              {/* Video Section - FULL SCREEN - removed padding */}
              <div className="md:col-span-8 md:order-1 order-2">
                <div className="aspect-video h-full w-full overflow-hidden">
                  {/* Mobile & Desktop Video */}
                  <video
                    className="w-full h-full object-cover"
                    controls
                    poster="/images/video-thumbnail.png"
                  >
                    <source
                      src="/images/introduction-video.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
