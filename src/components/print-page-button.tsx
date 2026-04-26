"use client";

export default function PrintPageButton() {
  return (
    <button
      onClick={() => window.print()}
      className="bg-primary text-white px-8 h-12 font-bold text-[10px] tracking-widest uppercase rounded-none shadow-xl hover:opacity-90 transition-all"
    >
      Print to PDF
    </button>
  );
}
