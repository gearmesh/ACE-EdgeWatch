
/**
 * About EdgeWatch Page
 *
 * Provides a detailed overview and history of the application.
 * Features a scrollable full-page text box for long-form content.
 */

import React from 'react';
import { BackArrowIcon } from './icons';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen p-4 text-white overflow-hidden">
      <header className="flex items-center mb-6 flex-shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2 tracking-wide">About EdgeWatch</h1>
      </header>

      <main className="flex-grow overflow-y-auto bg-slate-800/50 rounded-xl border border-slate-700 shadow-inner p-6 mb-4 custom-scrollbar">
        <div className="space-y-8 text-slate-300 leading-relaxed text-sm">
          <section>
            <h2 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              The Mission
            </h2>
            <p className="mb-4">
             ACE EdgeWatch is a high-performance incident response app designed to eliminate the "fog of war" during major enterprise service disruptions. In a modern distributed environment, identifying whether a failure is internal application or external Cloud-based dependency, can be a critical first step in mitigation.
            </p>
            
          </section>

          <section>
             <h2 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Why It Exists
             </h2>
             <p className="mb-4">
               During critical Sev 1 and Sev 2 incident calls, every second counts.
             </p>
             <p>
               EdgeWatch was built by the EUC Enterprise Engineering team to give engineers a "head start." By quickly able to test the health of AWS, Azure, Salesforce, Bing Maps, and other cloud providers, we can pivot from troubleshooting unknowns to engaging vendor support in seconds, not hours.
             </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              How It Works
            </h2>
            <div className="space-y-4">
              <div className="bg-slate-900/40 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-emerald-300 text-xs uppercase mb-1">1. Smart Scraping</h4>
                <p className="text-xs">
                  We scrape live data from DownDetector and official status endpoints, filtering through the noise to find region-specific impact reports for North America.
                </p>
              </div>
              <div className="bg-slate-900/40 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-emerald-300 text-xs uppercase mb-1">2. Functional Pinging</h4>
                <p className="text-xs">
                  For critical map and gateway services, we attempt to load raw assets (like map tiles or login descriptors) directly from the provider's CDN.
                </p>
              </div>
              <div className="bg-slate-900/40 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-emerald-300 text-xs uppercase mb-1">3. Gateway Verification</h4>
                <p className="text-xs">
                  Our Remote Access tests verify the frontend integrity of Citrix, BIG-IP, and PulseSecure gateways, ensuring that the primary entry points for our remote workforce remain operational.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-emerald-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-emerald-500 rounded-full"></span>
              Engineering Team
            </h2>
            <p className="mb-4">
              Brought to you by Greg Messemer and Mauricio Romero of the EUC Enterprise Engineering group, this tool is the result of an ambitious end-of-year goal. As engineers primarily focused on Endpoint User and Converged Engineering, stepping into mobile application programming was a significant learning curve. While the result may not be perfect, it reflects our dedication to growth and our commitment to creating robust solutions for the enterprise.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20 text-center">
                <span className="block font-bold text-white">Greg Messemer</span>
                <span className="text-[10px] text-emerald-400/80 font-mono uppercase">DevOps Engineer</span>
              </div>
              <div className="flex-1 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/20 text-center">
                <span className="block font-bold text-white">Mauricio Romero</span>
                <span className="text-[10px] text-emerald-400/80 font-mono uppercase">DevOps Senior</span>
              </div>
            </div>
          </section>

          <div className="pt-12 pb-6 border-t border-slate-700 text-[10px] text-slate-500 font-mono text-center uppercase tracking-widest">
            &copy; {new Date().getFullYear()} EUC Enterprise Engineering<br/>
            All Rights Reserved • Confidential Internal Tool
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </div>
  );
};

export default AboutPage;
