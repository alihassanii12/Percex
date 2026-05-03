'use client';

import { ReactNode } from 'react';

interface ServiceCardProps {
  num: string;
  icon: ReactNode;
  title: string;
  color: string;
  desc: string;
  tags: string[];
}

export function ServiceCard({ num, icon, title, color, desc, tags }: ServiceCardProps) {
  return (
    <div
      className="percexa-service-card relative flex flex-col p-10 group"
      style={{ background: '#13121f', transition: 'background 0.3s' }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = '#1a1928';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = '#13121f';
      }}
    >
      {/* Top glow line on hover */}
      <div
        className="percexa-service-top-line absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, #5b4bff, #00d4ff, transparent)' }}
      />

      {/* Number */}
      <span
        className="font-cabinet-grotesk font-bold text-xs tracking-[0.16em] mb-6"
        style={{ color: 'rgba(91,75,255,0.6)' }}
      >
        {num}
      </span>

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{ background: color, color: '#a89bff' }}
      >
        {icon}
      </div>

      {/* Text */}
      <h3
        className="font-cabinet-grotesk font-bold text-xl text-soft-gray mb-3"
        style={{ letterSpacing: '-0.4px' }}
      >
        {title}
      </h3>
      <p
        className="font-satoshi text-sm leading-relaxed mb-8 flex-1"
        style={{ color: 'rgba(232,230,255,0.42)' }}
      >
        {desc}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="font-satoshi text-xs px-3 py-1 rounded-full border"
            style={{ borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.38)' }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}