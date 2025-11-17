
import React from 'react';
import type { Page } from '../App';
import { EyeIcon, UserIcon, CloudIcon, ComputerIcon, BMCHelixIcon } from './icons';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const playClickSound = () => {
    try {
      // Ensure this code runs only in the browser
      if (typeof window === 'undefined') return;

      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      if (!audioContext) {
        console.warn("Web Audio API is not supported in this browser.");
        return;
      }
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // A soft click sound
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);

      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      console.error("Failed to play click sound:", error);
    }
  };

  const handleButtonClick = (page: Page) => {
    playClickSound();
    onNavigate(page);
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <main className="flex-grow flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-4 mb-12">
          <EyeIcon />
          <h1 className="text-4xl font-bold tracking-wider">ACE EdgeWatch</h1>
        </div>
        <div className="w-full max-w-xs space-y-4">
          <button
            onClick={() => handleButtonClick('smartit')}
            className="w-full flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Navigate to ACE Smart IT"
          >
            <BMCHelixIcon />
            ACE Smart IT
          </button>
          <button
            onClick={() => handleButtonClick('application')}
            className="w-full flex items-center justify-center gap-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Navigate to status by application"
          >
            <UserIcon />
            By Application
          </button>
          <button
            onClick={() => handleButtonClick('cloudprovider')}
            className="w-full flex items-center justify-center gap-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Navigate to status by cloud provider"
          >
            <CloudIcon />
            By Cloud Provider
          </button>
          <button
            onClick={() => handleButtonClick('aceingress')}
            className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            aria-label="Navigate to Remote Access Portals"
          >
            <ComputerIcon />
            Remote Access Portals
          </button>
        </div>
      </main>
      <footer className="text-center text-slate-400 text-xs">
        <p className="text-base">Greg Messemer and Mauricio Romero</p>
        <p className="text-slate-500 text-sm">End User Computing Engineers</p>
        <p className="mt-2">Service status provided by DownDetector</p>
      </footer>
    </div>
  );
};

export default HomePage;
