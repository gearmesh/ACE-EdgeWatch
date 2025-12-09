
import React, { useState } from 'react';
import type { Page } from '../App';
import { EyeIcon, UserIcon, CloudIcon, ComputerIcon, BMCHelixIcon } from './icons';
import { SpeedInsights } from "@vercel/speed-insights/next"
interface HomePageProps {
  onNavigate: (page: Page) => void;
}

interface NavButtonProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    accentColor: 'orange' | 'cyan' | 'indigo' | 'emerald';
    onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, title, description, accentColor, onClick }) => {
    // Dynamic color classes based on accent
    const colorStyles = {
        orange: 'text-orange-400 bg-orange-500/10 group-hover:bg-orange-500/20 group-hover:text-orange-300',
        cyan: 'text-cyan-400 bg-cyan-500/10 group-hover:bg-cyan-500/20 group-hover:text-cyan-300',
        indigo: 'text-indigo-400 bg-indigo-500/10 group-hover:bg-indigo-500/20 group-hover:text-indigo-300',
        emerald: 'text-emerald-400 bg-emerald-500/10 group-hover:bg-emerald-500/20 group-hover:text-emerald-300'
    };

    return (
        <button
            onClick={onClick}
            className="group relative w-full flex items-center gap-4 p-4 rounded-xl bg-slate-800 border border-slate-600 hover:border-slate-400 transition-all duration-300 hover:bg-slate-700 hover:shadow-2xl hover:shadow-black/50 active:scale-[0.98] shadow-lg shadow-black/40 ring-1 ring-white/5"
        >
            {/* Icon Container */}
            <div className={`p-3 rounded-lg transition-colors duration-300 ${colorStyles[accentColor]}`}>
                {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: "h-7 w-7" })}
            </div>

            {/* Text Content */}
            <div className="flex-1 text-left">
                <h3 className="font-semibold text-slate-100 text-lg tracking-tight group-hover:text-white transition-colors">
                    {title}
                </h3>
                <p className="text-xs font-medium text-slate-400 group-hover:text-slate-300 transition-colors">
                    {description}
                </p>
            </div>

            {/* Chevron Arrow */}
            <div className="text-slate-500 group-hover:text-slate-300 transition-all transform group-hover:translate-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </button>
    );
};

const MessageBox: React.FC<{ isOpen: boolean; message: string; onConfirm: () => void }> = ({ isOpen, message, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-[fade-in-up_0.2s_ease-out]">
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/10">
        <p className="text-white text-lg mb-6 font-medium leading-relaxed">{message}</p>
        <button
          onClick={onConfirm}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
        >
          OK
        </button>
      </div>
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [showSmartITPopup, setShowSmartITPopup] = useState(false);

  const playClickSound = () => {
    try {
      if (typeof window === 'undefined') return;
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioContext) return;
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) { /* ignore */ }
  };

  const handleButtonClick = (page: Page) => {
    playClickSound();
    if (page === 'smartit') {
        setShowSmartITPopup(true);
    } else {
        onNavigate(page);
    }
  };

  const handleSmartITConfirm = () => {
      setShowSmartITPopup(false);
      onNavigate('smartit');
  };

  return (
    <div className="relative min-h-screen bg-[#0B1120] text-white font-sans selection:bg-cyan-500/30 overflow-hidden">
        <style>{`
            @keyframes blink {
              0%, 100% { transform: scaleY(1); opacity: 1; }
              50% { transform: scaleY(0.1); opacity: 0.7; }
            }
            .animate-blink {
              animation: blink 0.5s ease-in-out 1;
              animation-delay: 1s;
              transform-origin: center;
            }
        `}</style>
        
        <MessageBox 
            isOpen={showSmartITPopup}
            message="ACE Smart IT is loading. This may take a moment"
            onConfirm={handleSmartITConfirm}
        />

        {/* Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none">
            <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-900/10 blur-[100px]" />
            <div className="absolute top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[100px]" />
            <div className="absolute -bottom-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-cyan-900/10 blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen p-6 max-w-md mx-auto">
            {/* Header Section */}
            <header className="flex flex-col items-center mt-1 mb-4 space-y-1">
                {/* Logo with Glass Effect */}
                <div className="relative group">
                    <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                    <div className="relative p-4 rounded-full bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-cyan-500/20 group-hover:ring-cyan-500/40 transition-all duration-300">
                        <EyeIcon className="h-10 w-10 text-cyan-400 animate-blink" />
                    </div>
                </div>

                <div className="text-center space-y-1">
                    <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg flex items-baseline justify-center">
                        ACE <span className="font-light text-slate-400 mx-2">EdgeWatch</span>
                        <span className="text-sm text-cyan-500 font-bold">v2.0</span>
                    </h1>
                    <div className="flex items-center justify-center gap-2 opacity-80">
                         <div className="h-[1px] w-4 bg-cyan-800"></div>
                         <p className="text-[10px] font-bold tracking-[0.25em] text-cyan-500 uppercase">
                            CHECK THE CLOUD'S PULSE
                         </p>
                         <div className="h-[1px] w-4 bg-cyan-800"></div>
                    </div>
                </div>
            </header>

            {/* Main Navigation List */}
            <main className="flex-grow w-full space-y-4">
                <NavButton
                   icon={<UserIcon />}
                   title="By Application"
                   description="Status for key enterprise applications"
                   accentColor="cyan"
                   onClick={() => handleButtonClick('application')}
                />
                
                <NavButton
                   icon={<CloudIcon />}
                   title="By Cloud Provider"
                   description="AWS, Azure & Google Cloud health"
                   accentColor="indigo"
                   onClick={() => handleButtonClick('cloudprovider')}
                />

                <NavButton
                   icon={<BMCHelixIcon />}
                   title="ACE Smart IT"
                   description="Incidents, changes & dashboard metrics"
                   accentColor="orange"
                   onClick={() => handleButtonClick('smartit')}
                />

                <NavButton
                   icon={<ComputerIcon />}
                   title="Remote Access Portals"
                   description="VPN, Citrix & F5 gateway status"
                   accentColor="emerald"
                   onClick={() => handleButtonClick('aceingress')}
                />
            </main>

            {/* Minimal Footer */}
            <footer className="mt-2 text-center space-y-2 pb-4">
                <p className="text-xl font-bold text-white drop-shadow-lg tracking-wide">
                    EUC Enterprise Engineering
                </p>
                <div className="flex justify-center items-center gap-3 text-sm font-semibold text-cyan-100 uppercase tracking-widest">
                    <span>Greg Messemer</span>
                    <span className="text-cyan-400">•</span>
                    <span>Mauricio Romero</span>
                </div>
                <p className="text-[10px] text-slate-500 pt-4">
                    Data provided by DownDetector & Official Status Pages
                </p>
            </footer>
        </div>
    </div>
  );
};

export default HomePage;
