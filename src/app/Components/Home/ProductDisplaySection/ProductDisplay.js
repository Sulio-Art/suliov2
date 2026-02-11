import Image from "next/image";
import { Card, CardContent } from "../../ui/card";
import { Badge } from "../../ui/badge";

function FeatureList({ features, color = "blue" }) {
  const diamondColors = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    yellow: "text-yellow-500",
    orange: "text-orange-500",
    green: "text-green-500",
  };

  return (
    <div className="space-y-3 md:space-y-4 py-3 md:py-4 h-full md:flex flex-col justify-evenly px-4 md:px-8">
      {features.map((feature, index) => (
        <div key={index} className="flex gap-2">
          <div
            className={`${diamondColors[color]} md:text-3xl text-xl flex-shrink-0 mt-1`}
          >
            ◆
          </div>
          <p className="text-black font-medium leading-tight text-sm md:text-xl lg:text-2xl">
            {feature}
          </p>
        </div>
      ))}
    </div>
  );
}

function Section({
  title,
  description,
  leftSideBullets,
  features,
  color,
  imageSrc,
  layout = "top",
}) {
  const bgColors = {
    blue: "bg-blue-600",
    purple: "bg-purple-600",
    yellow: "bg-yellow-500",
    orange: "bg-orange-500",
    green: "bg-green-500",
  };
  const diamondColors = {
    blue: "text-blue-600",
    purple: "text-purple-600",
    yellow: "text-yellow-500",
    orange: "text-orange-500",
    green: "text-green-500",
  };

  const getMobileContent = () => {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-[90%] mx-auto">
        <div className="text-center mb-6">
          <Badge
            variant="outline"
            className={`${bgColors[color]} rounded-full px-4 py-2 border-none hover:${bgColors[color]}`}
          >
            <h2 className="text-white text-xl font-medium">{title}</h2>
          </Badge>
        </div>

        <p className="text-gray-800 font-medium text-base mb-8 leading-relaxed text-center">
          {description}
        </p>

        <div className="space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <div
                className={`${diamondColors[color]} md:text-3xl text-xl flex-shrink-0 mt-1`}
              >
                ◆
              </div>
              <p className="text-black font-medium leading-tight text-sm md:text-xl lg:text-2xl">
                {feature}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getTabletAndDesktopContent = (layout) => {
    const titleFontSize = "text-[1.2rem] md:text-[1.6rem]";
    const descriptionFontSize =
      "text-gray-300 text-base md:text-lg leading-relaxed";
    const paddingX = "px-4 md:px-6";

    const renderTitle = () => (
      <div className="relative w-full flex items-center">
        <div
          className={`${bgColors[color]} rounded-l-full rounded-r-none ${paddingX} py-3 md:py-4 w-full flex items-center justify-center min-h-[4rem] md:min-h-[5rem]`}
        >
          <h2
            className={`text-white ${titleFontSize} font-medium text-center leading-snug`}
            style={{
              wordWrap: "break-word",
              overflowWrap: "break-word",
              hyphens: "auto",
            }}
          >
            {title}
          </h2>
        </div>
      </div>
    );

    const renderDescription = () => (
      <div className={`${paddingX} space-y-3`}>
        <p className={`${descriptionFontSize} mb-4`}>{description}</p>
        {leftSideBullets && leftSideBullets.length > 0 && (
          <div className="space-y-2">
            {leftSideBullets.map((bullet, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-white text-lg mt-1">◆</span>
                <p className={`${descriptionFontSize}`}>{bullet}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );

    switch (layout) {
      case "top":
        return (
          <>
            {renderTitle()}
            {renderDescription()}
          </>
        );
      case "top-middle-center":
        return (
          <>
            {renderTitle()}
            {renderDescription()}
          </>
        );
      case "middle":
        return (
          <>
            {renderDescription()}
            {renderTitle()}
          </>
        );
      case "bottom-middle-center":
        return (
          <>
            {renderDescription()}
            {renderTitle()}
          </>
        );
      case "bottom":
        return (
          <>
            {renderDescription()}
            {renderTitle()}
          </>
        );
      default:
        return null;
    }
  };

  const getTabletAndDesktopLayoutStyles = (layout) => {
    switch (layout) {
      case "top":
        return "relative top-0 space-y-3 md:space-y-6";
      case "top-middle-center":
        return "relative top-1/4 space-y-3 md:space-y-6";
      case "middle":
        return "flex flex-col justify-center space-y-3 md:space-y-6";
      case "bottom-middle-center":
        return "flex flex-col justify-center space-y-3 md:space-y-6";
      case "bottom":
        return "flex flex-col justify-end space-y-3 md:space-y-6";
      default:
        return "flex flex-col space-y-3 md:space-y-6";
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center bg-black">
      <div className="w-full h-full">
        <h1 className="text-xl md:text-3xl font-bold text-white text-center md:hidden pt-12 py-3 md:py-5 px-4 md:px-10">
          A Seamless Creative Workflow Powered by AI
        </h1>
        <div
          className="md:hidden min-h-screen flex flex-col justify-center py-10 px-4 relative"
          style={{
            backgroundImage: `url(${imageSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10">{getMobileContent()}</div>
        </div>

        <div className="hidden md:block h-screen">
          <h1 className="text-4xl lg:text-5xl font-bold text-white text-center py-6 md:py-10">
            A Seamless Creative Workflow Powered by AI
          </h1>
          <div className="grid md:grid-cols-4 gap-0 pb-20 md:pb-40 pl-10 md:pl-20 pr-0 h-full">
            <div
              className={`md:col-span-1 pr-0 flex flex-col ${getTabletAndDesktopLayoutStyles(layout)}`}
              style={{ minWidth: "250px" }}
            >
              {getTabletAndDesktopContent(layout)}
            </div>
            <Card className="md:col-span-3 bg-white grid grid-cols-1 md:grid-cols-2 border-none rounded-l-none">
              <CardContent className="h-full flex items-center p-0">
                <FeatureList features={features} color={color} />
              </CardContent>
              <div className="relative h-full">
                <Image
                  src={imageSrc || "/placeholder.svg"}
                  alt={title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProductDisplaySection() {
  const sections = [
    {
      title: "Automate Follower Engagement",
      description:
        "Artists often struggle to keep up with interactions from new followers. Sulio AI automatically sends personalized greetings and updates based on follower behavior, so you can stay connected without spending too much time.",
      leftSideBullets: [
        "Send personalized greetings automatically",
        "Engage followers based on their behavior",
        "Maintain connections effortlessly",
        "Save time on manual interactions",
      ],
      features: [
        "Automatically send personalized greetings and updates to your followers.",
        "Boost engagement by up to 85%, even when you're not online.",
        "Save time by skipping manual replies and focusing on your art.",
      ],
      color: "blue",
      imageSrc: "/images/section21.gif",
      layout: "top",
    },
    {
      title: "Smart Art Recommendations",
      description:
        "Not sure which buyer will be interested in your work? Sulio AI recommends the right artworks based on buyer preferences, helping you sell faster and avoid unsold pieces.",
      leftSideBullets: [
        "AI analyzes buyer preferences",
        "Match art to the right audience",
        "Increase conversion rates",
        "Reduce unsold inventory",
      ],
      features: [
        "AI analyzes buyer preferences and recommends artworks that match their taste.",
        "Speed up sales by 20% by getting your art in front of the right buyers.",
        "Connect your art with the right audience, increasing your chances of making sales.",
      ],
      color: "purple",
      imageSrc: "/images/section22.gif",
      layout: "top-middle-center",
    },
    {
      title: "Transaction Tracking",
      description:
        "Managing sales and commissions can be overwhelming for artists. Sulio AI simplifies the process by keeping all your transactions and inquiries organized and visible in one place.",
      leftSideBullets: [
        "Centralized transaction management",
        "Track commissions easily",
        "100% payment transparency",
        "Never miss a payment again",
      ],
      features: [
        "Track all your sales and commissions in a single platform.",
        "Get 100% transparency into your sales and payment status.",
        "No more worrying about missed payments or lost commission details.",
      ],
      color: "yellow",
      imageSrc: "/images/section23.gif",
      layout: "middle",
    },
    {
      title: "Fraud Detection",
      description:
        "Dealing with fraud can be stressful, especially when your buyers are from different regions. Sulio AI automatically detects and blocks suspicious activities, protecting you from fraud and scams.",
      leftSideBullets: [
        "Automatic fraud detection",
        "Block suspicious activities",
        "95% fraud risk reduction",
        "Focus on genuine buyers only",
      ],
      features: [
        "AI automatically detects and blocks potential fraud attempts.",
        "Reduce the risk of fraud by 95%, allowing you to interact with real buyers confidently.",
        "Spend less time handling scams and more time focusing on genuine buyers.",
      ],
      color: "orange",
      imageSrc: "/images/section24.gif",
      layout: "bottom-middle-center",
    },
    {
      title: "Streamlined Client Communication",
      description:
        "Handling multiple inquiries, after-sales support, and client communication can eat up valuable creative time. Sulio AI helps you manage all communications in one place, so you're not constantly answering the same questions.",
      leftSideBullets: [
        "Unified communication platform",
        "Automate repetitive responses",
        "25% time savings guaranteed",
        "Professional client experience",
      ],
      features: [
        "Manage client inquiries, sales questions, and after-sales support all in one platform.",
        "Save 25% of your time by automating repetitive client responses.",
        "Provide a smooth and professional experience for your clients, improving customer satisfaction.",
      ],
      color: "green",
      imageSrc: "/images/section25.gif",
      layout: "bottom",
    },
  ];

  return (
    <div className="relative bg-black">
      {sections.map((section, index) => (
        <div key={index} className="min-h-screen">
          <Section {...section} />
        </div>
      ))}
    </div>
  );
}
