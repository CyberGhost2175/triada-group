'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

type FAQItem = { question: string; answer: string };

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`item-${i}`}
          className="border-border py-2 first:pt-0"
        >
          <AccordionTrigger className="text-left text-text hover:text-accent hover:no-underline py-5 text-base font-medium">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="text-muted leading-relaxed pr-6">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
