
/**
 * Share App Page
 *
 * Allows users to share the application link with colleagues via native mobile intents.
 * - 'mailto:' for Email sharing
 * - 'sms:' for Text Message sharing
 */

import React from 'react';
import { BackArrowIcon, MailIcon, MessageIcon } from './icons';

interface SharePageProps {
  onBack: () => void;
}

const SharePage: React.FC<SharePageProps> = ({ onBack }) => {
  // Define the content in one place to ensure consistency between Email and SMS
  const shareSubject = "New ACE EdgeWatch App";
  const shareBodyContent = `Try this during your next Sev 1 or Sev 2 call, This app shows in seconds whether a problem is with providers like Microsoft or AWS, so you stop guessing and start fixing faster.
No install needed – it runs right in your browser from a simple link.
https://ace-edge-watch-git-main-ace-edgewatchs-projects.vercel.app`;

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareSubject);
    const body = encodeURIComponent(shareBodyContent);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleSmsShare = () => {
    // For SMS, we combine the Subject and Body into a single message since SMS doesn't have a 'Subject' field
    const fullMessage = `${shareSubject}\n\n${shareBodyContent}`;
    const encodedBody = encodeURIComponent(fullMessage);
    
    // Using 'sms:?body=' is the standard way to open the default SMS app
    // leaving the number empty prompts the user to select a contact
    window.location.href = `sms:?body=${encodedBody}`;
  };

  return (
    <div className="flex flex-col min-h-screen p-4 text-white relative">
        <style>{`
            .glass-panel {
                background: rgba(30, 41, 59, 0.7);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            }
        `}</style>
        
        {/* Background Gradients (matching HomePage) */}
        <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-pink-900/20 blur-[100px]" />
            <div className="absolute -bottom-[20%] left-[10%] w-[60%] h-[60%] rounded-full bg-purple-900/20 blur-[100px]" />
        </div>

      <header className="flex items-center mb-8">
        <button onClick={onBack} className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors">
          <BackArrowIcon />
        </button>
        <h1 className="text-xl font-bold ml-2 tracking-wide">Share ACE EdgeWatch</h1>
      </header>

      <main className="flex-grow flex flex-col gap-4">
        
        {/* Email Share Button */}
        <button
            onClick={handleEmailShare}
            className="group relative w-full flex items-center gap-4 p-5 rounded-xl bg-slate-800 border border-slate-600 hover:border-pink-400 transition-all duration-300 hover:bg-slate-700 hover:shadow-lg hover:shadow-pink-500/20 active:scale-[0.98]"
        >
            <div className="p-3 rounded-lg bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 group-hover:text-pink-300 transition-colors">
                <MailIcon />
            </div>
            <div className="flex-1 text-left">
                <h3 className="font-semibold text-slate-100 text-lg">Share by E-mail</h3>
                <p className="text-xs text-slate-400 group-hover:text-slate-300">Send a link via your mail app</p>
            </div>
            <div className="text-slate-500 group-hover:text-pink-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </button>

        {/* SMS Share Button */}
        <button
            onClick={handleSmsShare}
            className="group relative w-full flex items-center gap-4 p-5 rounded-xl bg-slate-800 border border-slate-600 hover:border-green-400 transition-all duration-300 hover:bg-slate-700 hover:shadow-lg hover:shadow-green-500/20 active:scale-[0.98]"
        >
            <div className="p-3 rounded-lg bg-green-500/10 text-green-400 group-hover:bg-green-500/20 group-hover:text-green-300 transition-colors">
                <MessageIcon />
            </div>
            <div className="flex-1 text-left">
                <h3 className="font-semibold text-slate-100 text-lg">Share by SMS/TEXT</h3>
                <p className="text-xs text-slate-400 group-hover:text-slate-300">Send a link via text message</p>
            </div>
            <div className="text-slate-500 group-hover:text-green-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </button>

      </main>
    </div>
  );
};

export default SharePage;
