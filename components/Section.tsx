
import React from 'react';

interface SectionProps {
  id?: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, label, children, className = "" }) => {
  return (
    <section id={id} className={`py-12 md:py-20 ${className}`}>
      <div className="flex items-center gap-4 mb-8 md:mb-12">
        <span className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-500 whitespace-nowrap">{label}</span>
        <div className="h-[1px] w-full bg-neutral-800"></div>
      </div>
      {children}
    </section>
  );
};

export default Section;
