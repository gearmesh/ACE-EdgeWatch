
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
  'radar-status';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash) {
      const speak = () => {
        // Ensure this runs only in the browser and speech synthesis is supported
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          // Stop any previous utterances to prevent queuing on re-renders
          window.speechSynthesis.cancel();
          
          const welcomeMessage = new SpeechSynthesisUtterance("Welcome to ACE Edge Watch.");

          const voices = window.speechSynthesis.getVoices();
          
          // Heuristic to find a British female voice. Voice names and availability vary widely.
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
        // Voices list is loaded asynchronously.
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
        return <SmartITPage onBack={() => navigate('home')} />;
      case 'radar-status':
        return <RadarStatusPage onBack={() => navigate('application')} />;
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="bg-slate-900 min-h-screen text-white font-sans">
      <div className="container mx-auto max-w-md">
        {renderPage()}
      </div>
    </div>
  );
};

export default App;
