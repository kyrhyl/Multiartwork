import React from 'react';

type Props = {
  title: string;
  subtitle: string;
  imageUrl?: string | null;
};

export function HeroSection({ title, subtitle, imageUrl }: Props) {
  return (
    <section className="relative w-full">
      <div className="mx-auto max-w-[1280px] px-4 md:px-10 py-5">
        <div 
          className="bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden min-h-[560px] flex flex-col justify-end p-8 md:p-12"
          style={{
            backgroundImage: imageUrl 
              ? `linear-gradient(rgba(16, 22, 34, 0.3) 0%, rgba(16, 22, 34, 0.8) 100%), url("${imageUrl}")`
              : 'linear-gradient(rgba(16, 22, 34, 0.5) 0%, rgba(16, 22, 34, 0.9) 100%), linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          <div className="max-w-2xl flex flex-col gap-6 animate-fade-in-up">
            <h1 className="text-white text-4xl md:text-6xl font-black leading-[1.1] tracking-[-0.033em]">
              {title}
            </h1>
            <h2 className="text-gray-200 text-lg md:text-xl font-medium leading-relaxed max-w-xl">
              {subtitle}
            </h2>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="/gallery"
                className="flex h-12 px-8 items-center justify-center rounded-lg bg-primary hover:bg-blue-700 text-white text-base font-bold transition-all transform hover:translate-y-[-1px] shadow-lg"
              >
                View Our Work
              </a>
              <a
                href="/contact"
                className="flex h-12 px-8 items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white text-base font-bold transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
