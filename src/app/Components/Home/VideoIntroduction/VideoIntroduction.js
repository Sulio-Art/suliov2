import Image from "next/image";
import { Card, CardContent } from "../../ui/card";

export default function VideoIntroduction() {
  return (
    /* REMOVED md:min-h-screen to prevent forced black space below content */
    <div className="relative overflow-hidden bg-black w-full">
      {/* Header section */}
      <div className="relative px-4 sm:px-6 lg:px-12 pt-12 sm:pt-20 pb-8 sm:pb-12 h-auto bg-black z-10">
        {/* TEXT SECTION: Changed z-index to 30 to bring it to the front */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-center relative z-30 max-w-7xl mx-auto">
          <div className="md:col-span-8 space-y-4 pr-0 sm:pr-44 md:pr-0">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
              People won't be replaced by AI, but by those who use it.
            </h1>
          </div>
        </div>

        {/* GIF Overlay - desktop only */}
        {/* CHANGED: Lowered z-index to 0 to push it behind the text */}
        <div className="hidden md:block absolute right-0 top-12 w-[420px] overflow-visible pointer-events-none z-0">
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
        {/* CHANGED: Added z-0 to ensure mobile icons also stay behind text */}
        <div className="absolute right-3 top-12 sm:top-20 md:hidden z-0">
          <Image
            src="/images/section4overlay.gif"
            alt="Decorative icons"
            width={160}
            height={160}
            className="w-28 sm:w-40 drop-shadow-xl"
          />
        </div>
      </div>

      {/* Main Card Section */}
      <div className="container mx-auto px-4 sm:px-6 pb-12 sm:pb-20 z-0 max-w-7xl">
        <Card className="rounded-3xl bg-gradient-to-br from-black via-gray-900 to-black text-white border-4 border-gray-800 overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            {/* On tablets (md), we use items-stretch to make both columns equal height.
                This prevents the text side from being shorter than the video side.
            */}
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              {/* Video Section - First on mobile, left side on desktop */}
              <div className="md:col-span-7 lg:col-span-8 order-1">
                <div className="aspect-video h-full w-full overflow-hidden">
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

              {/* Product Info - Second on mobile, right side on desktop */}
              <div className="md:col-span-5 lg:col-span-4 order-2 flex flex-col justify-center p-6 sm:p-8 lg:p-12 text-center md:text-left bg-gradient-to-br from-blue-600/20 to-purple-600/20">
                <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-2xl sm:text-3xl lg:text-5xl font-black mb-3 sm:mb-6 leading-tight">
                  Sulio Art
                  <br />
                  Artist AI Chatbot
                </h2>
                <p className="text-base sm:text-lg lg:text-xl font-medium text-gray-200 leading-relaxed">
                  Meet Sulio Art's all-in-one product experience AI Chatbot,
                  enhanced with artificial intelligence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
