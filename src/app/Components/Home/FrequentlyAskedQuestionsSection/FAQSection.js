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
    <>
      {/* ── MOBILE (< md) ── */}
      <div className="md:hidden w-full bg-gray-50">
        <div
          className="w-full py-10 px-6 text-white"
          style={{
            backgroundImage: "url(/images/FAQ.gif)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="bg-black/50 rounded-2xl p-6">
            <h2
              className="text-3xl font-black text-white uppercase leading-tight"
              style={{ lineHeight: "1.1" }}
            >
              FREQUENTLY ASKED QUESTIONS SECTION
            </h2>
          </div>
        </div>

        <div className="px-4 py-8">
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
                <AccordionTrigger className="text-base font-bold text-gray-900 text-left hover:no-underline py-5 px-5 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 px-5">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-black text-orange-600">Answer: </span>
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* ── TABLET & DESKTOP (md+) ── */}
      <div
        className="hidden md:block"
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
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

        {/* Diagonal Lines */}
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

        {/* FIXED TITLE: Adjusted width and font size for Tablet (md) vs Desktop (lg) */}
        <div
          className="absolute left-[5%] lg:left-[8%] top-[32%] w-[40%] lg:w-[30%]"
          style={{
            color: "#ffffff",
            fontWeight: "900",
            lineHeight: "1.1",
            textTransform: "uppercase",
            zIndex: "10",
          }}
        >
          <h2 className="text-3xl lg:text-5xl xl:text-6xl">
            FREQUENTLY ASKED QUESTIONS SECTION
          </h2>
        </div>

        {/* FAQ Accordion - FIXED: Adjusted width to 50% on tablet to give title more room */}
        <div
          className="absolute top-0 right-0 w-[50%] lg:w-[60%] min-h-[120vh] bg-[#f9fafb] shadow-[-10px_0_30px_rgba(0,0,0,0.1)] px-6 lg:px-20 py-16"
          style={{
            borderRadius: "0",
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
                <AccordionTrigger className="text-base lg:text-xl xl:text-2xl font-bold text-gray-900 text-left hover:no-underline py-6 px-6 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 px-6">
                  <p className="text-sm lg:text-lg xl:text-xl text-gray-700 leading-relaxed">
                    <span className="font-black text-orange-600">Answer: </span>
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </>
  );
}
