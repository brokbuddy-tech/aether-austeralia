
'use client';

import { Info } from "lucide-react";

export default function EnergyEfficiencyRating() {
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-sm md:text-base font-bold text-[#111111] uppercase tracking-tighter">Energy efficiency rating (EER)</h3>
          <p className="text-gray-400 text-[10px] font-medium">Last updated in March 2026 from agent supplied data</p>
        </div>
        <button className="text-gray-300 hover:text-primary transition-colors">
          <Info className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white rounded-none border border-gray-100 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 text-gray-500 text-sm leading-relaxed font-body">
          This property's energy efficiency has a <span className="font-bold text-[#111111]">medium quality</span> rating of <span className="font-bold text-[#111111]">6/10</span>. To learn more about EER Scores, visit the <a href="https://www.nathers.gov.au/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-bold">Nationwide House Energy Rating Scheme.</a>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-20">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="eerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#DCFCE7" />
                  <stop offset="50%" stopColor="#4ADE80" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
              {/* Background Arc */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="#F3F4F6"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Progress Arc (60%) */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="url(#eerGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="125.6"
                strokeDashoffset={125.6 * 0.4}
              />
              {/* Needle */}
              <g transform="translate(50, 50)">
                <line
                  x1="0" y1="0"
                  x2={32 * Math.cos(-Math.PI * 0.9 + (Math.PI * 0.8 * 0.6))}
                  y2={32 * Math.sin(-Math.PI * 0.9 + (Math.PI * 0.8 * 0.6))}
                  stroke="#4B5563"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="0" r="4" fill="white" stroke="#4B5563" strokeWidth="2" />
              </g>
            </svg>
          </div>
          <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mt-3 uppercase">6.0 EER</span>
        </div>
      </div>
    </div>
  );
}
