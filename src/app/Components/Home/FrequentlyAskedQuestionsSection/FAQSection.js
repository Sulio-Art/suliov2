import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";

export default function FrequentlyAskedQuestions() {
  const faqData = [
    {
      question: "How can Sulio AI help me sell more art?",
      answer:
        "Sulio AI helps by automatically engaging with potential buyers and recommending your art based on their preferences. Many artists see a 20-30% increase in sales within the first few months by leveraging the chatbot to build deeper connections with their audience.",
    },
    {
      question: "Do I need any technical skills to use the AI chatbot?",
      answer:
        "No technical skills are required! Sulio AI is designed to be user-friendly and intuitive. With pre-configured templates and easy-to-follow guides, you can get set up in minutes, allowing you to focus on your art while we handle the rest.",
    },
    {
      question: "How secure is the platform for handling my transactions?",
      answer:
        "Sulio AI takes security very seriously. We use industry-standard encryption to ensure that your personal data, financial information, and transactions are safe. All transactions are tracked transparently, and you have full visibility at every step.",
    },
    {
      question: "Can I customize the way Sulio AI interacts with my followers?",
      answer:
        "Yes! You can fully customize the chatbot responses to fit your personal tone and style. Whether you want to greet new followers, answer common questions, or share stories about your work, Sulio AI can be tailored to reflect your unique artistic voice.",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
      }}
    >
      {/* Background Image - Full Width */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: "url(/images/FAQ.gif)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Diagonal Lines Pattern on Yellow Area - Clipped to stay within bounds */}
      <svg
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "38%",
          height: "28%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <pattern
            id="diagonalLines"
            patternUnits="userSpaceOnUse"
            width="40"
            height="40"
            patternTransform="rotate(45)"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="40"
              stroke="#0a3a3a"
              strokeWidth="1.5"
              opacity="0.3"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
      </svg>

      {/* Text Overlays on the Image */}
      <div
        style={{
          position: "absolute",
          top: "4%", // Changed from "8%" to "4%" - moved up
          right: "65%",
          width: "30%",
          textAlign: "right",
          color: "#4a4a4a",
          fontSize: "1.2rem",
          lineHeight: "1.6",
          fontWeight: "400",
        }}
      >
        Here are four common
        <br />
        questions that artists
        <br />
        might ask when using
        <br />
        Sulio's AI Chatbot
        <br />
        Assistant, along with
        <br />
        answers:
      </div>

      <div
        style={{
          position: "absolute",
          top: "32%",
          left: "8%",
          width: "30%",
          color: "#ffffff",
          fontSize: "3.5rem",
          fontWeight: "900",
          lineHeight: "1.1",
          textTransform: "uppercase",
        }}
      >
        FREQUENTLY ASKED QUESTIONS SECTION
      </div>

      {/* FAQ Accordion - Overlaid on Right Side */}
      <div
        style={{
          position: "absolute",
          top: "0",
          right: "0",
          width: "60%",
          minHeight: "120vh",
          padding: "4rem 5rem",
          backgroundColor: "#f9fafb",
          borderRadius: "0",
          boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index}`}
              className="bg-white shadow-sm hover:shadow-md transition-all duration-300"
              style={{
                border: "2px solid #d1d5db",
                borderRadius: "1.5rem",
              }}
            >
              <AccordionTrigger className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 text-left hover:no-underline py-6 px-6 lg:px-8 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6 px-6 lg:px-8">
                <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed">
                  <span className="font-black text-orange-600">Answer: </span>
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
