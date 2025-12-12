
/**
 * Root Application Component
 *
 * Responsibilities:
 * - Manages the global navigation state (Custom router implementation via `currentPage` state).
 * - Controls the application lifecycle (Splash screen -> Main Content).
 * - Handles global "Back" button interception to prevent accidental app closure on mobile.
 * - Initializes Text-to-Speech (TTS) for the welcome message.
 */

import React, { useState, useCallback, useEffect } from 'react';
import HomePage from './components/HomePage';
import ApplicationPage from './components/ApplicationPage';
import ServicePage from './components/ServicePage';
import CloudProviderPage from './components/CloudProviderPage';
import SplashScreen from './components/SplashScreen';
import PulseSecurePage from './components/PulseSecurePage';
import RemoteAccessPage from './components/RemoteAccessPage';
import CitrixPage from './components/CitrixPage';
import BigIPPage from './components/BigIPPage';
import SmartITPage from './components/SmartITPage';
import RadarStatusPage from './components/RadarStatusPage';
import CloudflareStatusPage from './components/CloudflareStatusPage';
import SharePage from './components/SharePage';
import HelpPage from './components/HelpPage';

export type Page = 
  'home' | 
  'application' | 
  'ecommerce' | 
  'outlook' | 
  'intune' | 
  'sso' |
  'cloudprovider' |
  'bing' |
  'googlemaps' |
  'azure' |
  'aws' |
  'microsoft' |
  'salesforce' |
  'pulsesecure' |
  'aceingress' |
  'citrix' |
  'bigip' |
  'smartit' |
  'radar-status' |
  'cloudflare-status' |
  'share' |
  'help';

// Exit Confirmation Modal Component
const ExitConfirmationModal: React.FC<{ isOpen: boolean; onConfirm: () => void; onCancel: () => void }> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-sm animate-[fade-in-up_0.2s_ease-out]">
      <div className="bg-slate-800 border border-slate-600 rounded-xl shadow-2xl max-w-sm w-full p-6 text-center ring-1 ring-white/10">
        <h3 className="text-xl font-bold text-white mb-2">Exit App?</h3>
        <p className="text-slate-300 mb-8 text-sm leading-relaxed">Are you sure you want to leave?</p>
        <div className="flex gap-4 justify-center">
            <button
                onClick={onCancel}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg"
            >
                No
            </button>
            <button
                onClick={onConfirm}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-lg shadow-cyan-500/20"
            >
                Yes
            </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showSplash, setShowSplash] = useState(true);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // LIFECYCLE: Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  // EFFECT: Handle Speech Synthesis (Welcome Message)
  // This effect runs once the splash screen is dismissed. It attempts to find a
  // British female voice to announce the welcome message.
  useEffect(() => {
    if (!showSplash) {
      const speak = () => {
        // Ensure this runs only in the browser and speech synthesis is supported
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          // Stop any previous utterances to prevent queuing on re-renders
          window.speechSynthesis.cancel();
          
          const welcomeMessage = new SpeechSynthesisUtterance("Welcome to ACE Edge Watch.");

          const voices = window.speechSynthesis.getVoices();
          
          // Heuristic to find a British female voice. Voice names and availability vary widely across browsers/OS.
          let selectedVoice = voices.find(voice => 
            voice.lang === 'en-GB' && 
            (voice.name.includes('Female') || voice.name.toLowerCase().includes('susan') || voice.name.toLowerCase().includes('hazel') || voice.name.toLowerCase().includes('kate'))
          );
          
          // Fallback: Find any British voice if a specifically female one isn't found
          if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang === 'en-GB');
          }

          // Fallback: Find any other English-speaking female voice
          if (!selectedVoice) {
            selectedVoice = voices.find(voice => 
              voice.lang.startsWith('en') && 
              (voice.name.includes('Female') || voice.name.includes('Zira') || voice.name.includes('Samantha'))
            );
          }

          if (selectedVoice) {
            welcomeMessage.voice = selectedVoice;
          }

          window.speechSynthesis.speak(welcomeMessage);
        } else {
          console.warn('Speech Synthesis not supported in this browser.');
        }
      };

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        // Voices list is loaded asynchronously in some browsers (e.g. Chrome)
        if (synth.getVoices().length === 0) {
          synth.addEventListener('voiceschanged', speak);
        } else {
          speak();
        }

        return () => {
          synth.removeEventListener('voiceschanged', speak);
          synth.cancel(); // Stop speaking on component unmount
        };
      }
    }
  }, [showSplash]);

  // EFFECT: Intercept Swipe-to-Close / Back Button on Home Page
  // We manipulate the History API to create a "trap" state. If the user hits back/swipes back
  // while on the home page, we catch the event and show a modal instead of leaving the page.
  useEffect(() => {
    // Only trap back navigation on Home and when splash is gone
    if (currentPage === 'home' && !showSplash) {
        // Push a dummy state to the history stack. 
        // This ensures there is a "forward" state we are currently in, so "Back" goes to the previous one (which triggers popstate).
        window.history.pushState({ page: 'home' }, '', window.location.href);

        const handlePopState = (event: PopStateEvent) => {
            // User pressed back or swiped back.
            // Since we pushed a state, this event means we popped that state.
            // We want to stop the user from leaving, so we show the modal.
            
            // Prevent default isn't strictly needed for popstate as the navigation already happened,
            // but we stop propagation to be safe.
            event.preventDefault();
            setShowExitConfirm(true);
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }
  }, [currentPage, showSplash]);

  const handleExitConfirm = () => {
    setShowExitConfirm(false);
    // User confirmed exit.
    // We are currently in the state *before* the one we pushed (because popstate fired).
    // To truly exit, we trigger another back action.
    try {
        window.history.back();
    } catch (e) {
        // Fallback if history is empty (unlikely if we pushed)
        window.close();
    }
  };

  const handleExitCancel = () => {
    setShowExitConfirm(false);
    // User wants to stay.
    // Re-push the state to re-arm the trap for the next swipe.
    window.history.pushState({ page: 'home' }, '', window.location.href);
  };

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} />;
      case 'application':
        return <ApplicationPage onNavigate={navigate} />;
      case 'ecommerce':
        return <ServicePage serviceName="E-Commerce" onBack={() => navigate('application')} />;
      case 'outlook':
        return <ServicePage serviceName="Outlook" onBack={() => navigate('application')} />;
      case 'intune':
        return <ServicePage serviceName="Intune" onBack={() => navigate('application')} />;
      case 'sso':
        return <ServicePage serviceName="SSO" onBack={() => navigate('application')} />;
      case 'cloudprovider':
        return <CloudProviderPage onNavigate={navigate} />;
      case 'bing':
        return <ServicePage serviceName="Bing Maps" onBack={() => navigate('cloudprovider')} />;
      case 'googlemaps':
        return <ServicePage serviceName="Google Maps" onBack={() => navigate('cloudprovider')} />;
      case 'azure':
        return <ServicePage serviceName="Azure" onBack={() => navigate('cloudprovider')} />;
      case 'aws':
        return <ServicePage serviceName="AWS" onBack={() => navigate('cloudprovider')} />;
      case 'microsoft':
        return <ServicePage serviceName="Microsoft" onBack={() => navigate('cloudprovider')} />;
      case 'salesforce':
        return <ServicePage serviceName="Salesforce" onBack={() => navigate('cloudprovider')} />;
      case 'pulsesecure':
        return <PulseSecurePage onBack={() => navigate('aceingress')} />;
      case 'citrix':
        return <CitrixPage onBack={() => navigate('aceingress')} />;
      case 'bigip':
        return <BigIPPage onBack={() => navigate('aceingress')} />;
      case 'aceingress':
        return <RemoteAccessPage onNavigate={navigate} />;
      case 'smartit':
        return <SmartITPage onBack={() => navigate('home')} onNavigate={navigate} />;
      case 'radar-status':
        return <RadarStatusPage onBack={() => navigate('application')} />;
      case 'cloudflare-status':
        return <CloudflareStatusPage onBack={() => navigate('application')} />;
      case 'share':
        return <SharePage onBack={() => navigate('smartit')} />;
      case 'help':
        return <HelpPage onBack={() => navigate('smartit')} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <ExitConfirmationModal 
        isOpen={showExitConfirm} 
        onConfirm={handleExitConfirm} 
        onCancel={handleExitCancel} 
      />
      <div className="container mx-auto max-w-md">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
