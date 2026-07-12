import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQS } from '../data';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="py-20 bg-white relative border-t border-potato-brown/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-[#FFC928]/20 text-[#8B5E34] text-xs font-bold rounded-full mb-2 uppercase tracking-wider">
            Tanya Jawab
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#8B5E34] tracking-tight">
            FAQ Dapur Ama Snack
          </h2>
          <div className="w-24 h-1 bg-[#F59E0B] mx-auto rounded-full" />
          <p className="text-[#1E1E1E]/75 text-sm sm:text-base font-sans">
            Bagian ini disesuaikan dengan alur order baru dan kategori menu yang sekarang lebih rinci.
          </p>
        </div>

        <div id="faq-accordions" className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border-2 border-[#8B5E34]/15 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 transition-colors hover:bg-[#FFF6E5] focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#F59E0B] shrink-0" />
                    <span className="font-display font-bold text-sm sm:text-base text-[#8B5E34]">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#FFF6E5] border border-[#8B5E34]/10 flex items-center justify-center shrink-0 text-[#8B5E34]">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-64 border-t-2 border-[#8B5E34]/10' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-[#1E1E1E]/75 text-xs sm:text-sm font-sans leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
