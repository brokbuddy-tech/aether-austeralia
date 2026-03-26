'use client';

import { Badge } from "@/components/ui/badge";

interface InternetAvailabilityProps {
  address: string;
  suburb: string;
}

export default function InternetAvailability({ address, suburb }: InternetAvailabilityProps) {
  const currentMonthYear = new Intl.DateTimeFormat('en-AU', { month: 'short', year: 'numeric' }).format(new Date());

  return (
    <div className="mb-16">
      <div className="mb-6">
        <h3 className="text-sm md:text-base font-bold text-[#111111] uppercase tracking-tighter">Internet availability</h3>
        <p className="text-gray-400 text-[10px] font-medium">{address}, {suburb} has an FTTP NBN connection, updated {currentMonthYear}</p>
      </div>

      <div className="bg-white rounded-none border border-gray-100 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-sm text-[#111111]">Current NBN connection</h4>
            <Badge className="bg-sky-100 text-sky-600 border-none rounded-sm px-2 py-0.5 text-[10px] font-bold">FTTP</Badge>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed font-body">
            This property is connected to <span className="text-blue-600 font-medium">NBN Fibre to the Premises</span> which can support download speeds up to 1000Mbps and 400Mbps upload with a corresponding internet plan.
          </p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-20">
            <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="internetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FDE68A" />
                  <stop offset="50%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#EA580C" />
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
              {/* Progress Arc (Full/Amazing) */}
              <path
                d="M 10 50 A 40 40 0 0 1 90 50"
                fill="none"
                stroke="url(#internetGradient)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray="125.6"
                strokeDashoffset="0"
              />
              {/* Needle */}
              <g transform="translate(50, 50)">
                <line
                  x1="0" y1="0"
                  x2={32 * Math.cos(-Math.PI * 0.9 + (Math.PI * 0.8 * 0.95))}
                  y2={32 * Math.sin(-Math.PI * 0.9 + (Math.PI * 0.8 * 0.95))}
                  stroke="#4B5563"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="0" cy="0" r="4" fill="white" stroke="#4B5563" strokeWidth="2" />
              </g>
            </svg>
          </div>
          <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] mt-3 uppercase">AMAZING</span>
        </div>
      </div>
      <p className="mt-4 text-[10px] text-gray-400 font-medium">Always check with your preferred provider to see what options are available at this property</p>
    </div>
  );
}
