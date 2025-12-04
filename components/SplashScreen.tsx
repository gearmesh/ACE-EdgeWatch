
import React from 'react';
import { EyeIcon } from './icons';

const SplashScreen: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#0B1120] text-white overflow-hidden font-sans">
      {/* Dynamic Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[100px]" />
      </div>

      <style>{`
        @keyframes blink {
          0%, 45%, 55%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(0.1); opacity: 0.7; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-blink {
          animation: blink 4s infinite ease-in-out;
          transform-origin: center;
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>

      <div className="z-10 flex flex-col items-center">
        {/* Logo Container */}
        <div className="relative mb-12 group">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl animate-[pulse-glow_3s_infinite]"></div>
            
            {/* Main Icon Circle with Glassmorphism */}
            <div className="relative flex items-center justify-center w-64 h-64 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-2xl shadow-black/60 ring-1 ring-white/10">
                 <EyeIcon className="h-40 w-40 text-cyan-400 animate-blink drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
            </div>
        </div>

        {/* Typography */}
        <div className="text-center animate-fade-in-up space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight">
            <span className="text-white drop-shadow-lg">ACE</span>
            <span className="text-slate-400 font-light ml-3">EdgeWatch</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4 mt-2">
             <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
             <p className="text-xs text-cyan-500 font-semibold tracking-[0.3em] uppercase drop-shadow-md">
                CHECK THE CLOUD'S PULSE
             </p>
             <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
          </div>

          {/* Credits Section - Moved Up and Brightened */}
          <div className="pt-8 space-y-2">
              <p className="text-xl font-bold text-white drop-shadow-lg tracking-wide">
                 EUC Enterprise Engineering
              </p>
              <div className="flex justify-center items-center gap-3 text-sm font-semibold text-cyan-100 uppercase tracking-widest">
                  <span>Greg Messemer</span>
                  <span className="text-cyan-400">•</span>
                  <span>Mauricio Romero</span>
              </div>
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      <div className="absolute bottom-20 z-10 flex flex-col items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="h-0.5 w-32 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent animate-[shimmer_1.5s_infinite]"></div>
          </div>
          <p className="text-[10px] text-slate-500 font-mono tracking-widest">INITIALIZING SECURE CONNECTION</p>
      </div>
    </div>
  );
};

export default SplashScreen;
