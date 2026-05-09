'use client';

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar skeleton */}
      <div className="h-20 border-b border-slate-100 flex items-center px-8">
        <div className="w-10 h-10 bg-slate-100 rounded-xl animate-pulse"></div>
        <div className="hidden md:flex gap-8 ml-auto">
          {[1,2,3,4,5].map(i => <div key={i} className="w-20 h-4 bg-slate-50 rounded-full animate-pulse"></div>)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-24">
        {/* Hero skeleton */}
        <div className="max-w-3xl space-y-8 mb-24">
          <div className="h-4 w-40 bg-emerald-100 rounded-full animate-pulse"></div>
          <div className="h-20 w-full bg-slate-100 rounded-[2rem] animate-pulse"></div>
          <div className="h-20 w-4/5 bg-slate-100 rounded-[2rem] animate-pulse"></div>
          <div className="h-6 w-2/3 bg-slate-50 rounded-full animate-pulse"></div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-[3rem] bg-slate-50 border border-slate-100 animate-pulse p-12 space-y-6">
              <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
              <div className="h-8 w-3/4 bg-slate-200 rounded-xl"></div>
              <div className="h-4 w-full bg-slate-100 rounded-full"></div>
              <div className="h-4 w-5/6 bg-slate-100 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Centered branding overlay (subtle) */}
      <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
         <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 mb-2">
               <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-4 h-4 bg-emerald-500 rounded-sm animate-ping"></div>
               </div>
               <span className="font-black text-slate-200 uppercase tracking-tighter text-xl">WEBHOUSE</span>
            </div>
            <div className="w-48 h-1 bg-slate-50 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 w-1/3 animate-[loading_2s_infinite]"></div>
            </div>
         </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
