import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FaqSection() {
  return (
    <section
      id="faq"
      className="w-full max-w-3xl mx-auto py-12 sm:py-16 px-4 sm:px-6"
    >
      {/* TITLE */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-900">
        Frequently Asked Questions
      </h2>

      {/* ACCORDION */}
      <Accordion type="single" collapsible className="w-full space-y-3">
        <AccordionItem
          value="item-1"
          className="bg-white border border-gray-100 rounded-xl px-3 sm:px-4"
        >
          <AccordionTrigger className="text-left text-sm sm:text-base font-medium">
            Why should kids and teens learn to code?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Coding helps improve logical thinking, problem-solving, creativity,
            and mathematical skills. It also builds strong career opportunities
            in the future.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-2"
          className="bg-white border border-gray-100 rounded-xl px-3 sm:px-4"
        >
          <AccordionTrigger className="text-left text-sm sm:text-base font-medium">
            My child is a beginner. Is prior experience required?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed">
            No prior coding experience is needed. Mindset courses are designed
            for complete beginners with step-by-step learning.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-3"
          className="bg-white border border-gray-100 rounded-xl px-3 sm:px-4"
        >
          <AccordionTrigger className="text-left text-sm sm:text-base font-medium">
            What is the right age to start coding?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Kids can start as early as 5–6 years old using fun, game-based
            learning methods.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-4"
          className="bg-white border border-gray-100 rounded-xl px-3 sm:px-4"
        >
          <AccordionTrigger className="text-left text-sm sm:text-base font-medium">
            What devices are needed to start learning coding?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed">
            A basic laptop or desktop with internet connection is enough to
            begin coding.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="item-5"
          className="bg-white border border-gray-100 rounded-xl px-3 sm:px-4"
        >
          <AccordionTrigger className="text-left text-sm sm:text-base font-medium">
            Is coding only for students who want to become engineers?
          </AccordionTrigger>
          <AccordionContent className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Not at all. Coding improves thinking skills and is useful in almost
            every career today.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  );
}
