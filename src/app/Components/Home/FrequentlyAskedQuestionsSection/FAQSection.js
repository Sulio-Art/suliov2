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
    <div className="min-h-screen w-full flex flex-col justify-center items-center lg:flex-row gap-0 bg-gradient-to-br from-gray-50 to-white py-20">
      {/* Left Side - Title with Background */}
      <div
        className="text-4xl md:text-5xl lg:text-6xl font-black h-auto lg:h-full w-full lg:w-[45%] bg-cover bg-center bg-no-repeat flex flex-col lg:flex-row py-16 lg:py-0"
        style={{ backgroundImage: "url(/images/FAQ.gif)" }}
      >
        <div className="h-full w-full flex font-black justify-center items-center text-center lg:text-left px-8 lg:px-12">
          <div className="space-y-4">
            <h2 className="text-gray-900 leading-tight">Frequently</h2>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
              Asked Questions
            </h2>
          </div>
        </div>
      </div>

      {/* Right Side - FAQ Accordion */}
      <div className="flex justify-center items-center h-full px-6 lg:px-12 py-12 lg:py-20 w-full lg:w-[55%]">
        <Accordion
          type="single"
          collapsible
          className="w-full max-w-3xl space-y-6"
        >
          {faqData.map((faq, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`item-${index}`}
              className="border-2 border-gray-200 rounded-2xl px-6 lg:px-8 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:border-orange-300"
            >
              <AccordionTrigger className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 text-left hover:no-underline py-6 hover:text-orange-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-6">
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
