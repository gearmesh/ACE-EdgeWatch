
import React from 'react';

const iconProps = {
  className: "h-8 w-8 text-white",
  strokeWidth: "1.5",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor"
};

export const EyeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-12 w-12 text-cyan-400"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

export const UserIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);


export const CloudIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className} xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z" />
  </svg>
);

export const ComputerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
);

export const CartIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c.51 0 .962-.328 1.093-.822l-1.342-6.111H5.12z" />
    </svg>
);

export const MailIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

export const PhoneIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
);

export const KeyIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
    </svg>
);

export const PlaceholderIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
);

export const BackArrowIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
);

export const MapIcon: React.FC<{className?: string}> = ({className}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className || "h-8 w-8 text-white"} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25l-4.5-2.25v-11.25l4.5 2.25m0 0l4.5-2.25M9 20.25v-11.25m4.5 2.25l4.5-2.25m0 0l-4.5 2.25m4.5-2.25v11.25l-4.5 2.25M3.75 6.75l4.5-2.25m0 0l4.5 2.25m0 0l4.5-2.25m0 0l-4.5-2.25m-4.5 2.25l-4.5 2.25" />
    </svg>
);

export const MapLocationIcon: React.FC<{className?: string}> = ({className}) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className || "h-8 w-8 text-white"} 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor" 
        strokeWidth={1.5}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

export const ServerIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
    </svg>
);

export const BuildingIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
);

export const SalesforceIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.25 18.5l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 011.423 1.423L19.25 18.5l-1.188.648a2.25 2.25 0 01-1.423 1.423z" />
    </svg>
);

export const MSEntraIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.58 3L22 17.15h-4.32l-5.1-8.83-2.58 4.47L14.58 3zM9.42 21L2 6.85h4.32l5.1 8.83 2.58-4.47L9.42 21z"/>
    </svg>
);

export const MSTeamsIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
    </svg>
);

export const PulseSecureIcon: React.FC<{className?: string}> = ({className}) => (
<svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8"} viewBox="0 0 48 48">
    {/* 1. Background: Standard Gray (#6B7280) 
        - 48x48 Container
        - Rounded corners (rx=8)
    */}
    <rect width="48" height="48" rx="8" fill="#6B7280" />
    
    {/* 2. Pulse Secure "S" Logo Group
        - strokeWidth="5": Bold thickness matches the uploaded png.
        - strokeLinecap="round": Essential for the "GoodIcon" look.
    */}
    <g fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        
        {/* Green Top Loop (Upper Hook)
            - Start: Left-Middle (17, 23)
            - Top: (24, 15)
            - Right: (31, 22)
            - End: (27, 26) -> RETRACTED. 
              (Previous was 28,27 which was too close to center. 
               27,26 pulls it back up/right to clear the gap.)
        */}
        <path 
            d="M 17 23 L 24 15 L 31 22 L 27 26" 
            stroke="#4ade80" 
        />

        {/* White Bottom Loop (Lower Hook)
            - Start: Right-Middle (31, 25)
            - Bottom: (24, 33)
            - Left: (17, 26)
            - End: (21, 22) -> RETRACTED.
              (Previous was 20,21. 
               21,22 pulls it down/left away from the green hook.)
        */}
        <path 
            d="M 31 25 L 24 33 L 17 26 L 21 22" 
            stroke="white" 
        />
    </g>
</svg>
);

export const CitrixIcon: React.FC<{className?: string}> = ({className}) => (
<svg {...iconProps} className={className || iconProps.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    {/* Scaling Group:
      - scale(0.917): Shrinks the content to ~22px width (leaving 1px padding on each side).
      - translate(1, 1): Centers the shrunk content back into the 24x24 box.
    */}
    <g transform="translate(1, 1) scale(0.917)">
        
        {/* Background Circle (Citrix Brand Blue) */}
        <circle cx="12" cy="12" r="12" fill="#0067B9" />
        
        {/* Signal Arcs 
            - Grouped to apply shared styles (white stroke, round caps)
        */}
        <g stroke="white" strokeWidth="2.5" strokeLinecap="round">
            {/* Inner Arc */}
            <path d="M15.9,9.75 A4.5,4.5 0 1,0 15.9,14.25" />
            
            {/* Outer Arc */}
            <path d="M18.9,8 A8,8 0 1,0 18.9,16" />
        </g>
        
        {/* Center Dot */}
        <circle cx="12" cy="12" r="1.5" fill="white" />
    </g>
</svg>
);

export const BigIPIcon: React.FC<{className?: string}> = ({className}) => (
<svg {...iconProps} className={className || iconProps.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="none">
    {/* Red Circle (F5 Brand Red) */}
    <circle cx="12" cy="12" r="10" fill="#E31E29"/>
    
    {/* F5 Text Logo */}
    <text 
        x="12" 
        y="12" 
        dy=".35em" 
        textAnchor="middle" 
        fill="white" 
        fontFamily="Arial, sans-serif" 
        fontWeight="bold" 
        fontSize="14"
        letterSpacing="-1.5"
    >
        f5
    </text>
</svg>
);

export const BMCHelixIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-8 w-8 text-white"} viewBox="0 0 32 32" fill="currentColor">
        <path d="M12.789 2.133c-6.111 0.011-10.933 5.433-10.1 11.456 0.611 4.5 3.989 8.278 8.444 9.178 0.356 0.078 0.733 0.111 1.1 0.111 5.922-0.011 10.7-5.178 10.333-11.1-0.267-4.144-3.233-7.589-7.278-8.5-0.167-0.033-0.344-0.056-0.511-0.089l-0.011 0.033c0.1 0.022 0.211 0.044 0.311 0.067 3.322 0.744 5.756 3.6 5.989 7.033 0.311 4.8-3.1 9.078-7.856 9.544-4.822 0.489-9.178-2.811-9.833-7.511-0.7-5.022 2.767-9.489 7.744-9.9l0.189-0.011c-1.122-0.656-2.433-1.044-3.8-1.078h-0.011zM19.211 19.867c6.111-0.011 10.933-5.433 10.1-11.456-0.611-4.5-3.989-8.278-8.444-9.178-0.356-0.078-0.733-0.111-1.1-0.111-5.922 0.011-10.7 5.178-10.333 11.1 0.267 4.144 3.233 7.589 7.278 8.5 0.167 0.033 0.344 0.056 0.511 0.089l0.011-0.033c-0.1-0.022-0.211-0.044-0.311-0.067-3.322-0.744-5.756-3.6-5.989-7.033-0.311-4.8 3.1-9.078 7.856-9.544 4.822-0.489 9.178 2.811 9.833 7.511 0.7 5.022-2.767 9.489-7.744 9.9l-0.189 0.011c1.122 0.656 2.433 1.044 3.8 1.078h0.011z"/>
    </svg>
);

export const CloudflareIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.5 4.5 0 002.25 15z" />
    </svg>
);

export const MultipleAppsIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

export const FamilyIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        {/* Person 1 (Left Parent) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 9a2 2 0 100-4 2 2 0 000 4zM6 10c-1.5 0-3 1-3 2v2h6v-2c0-1-1.5-2-3-2z" />
        {/* Person 2 (Right Parent) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9a2 2 0 100-4 2 2 0 000 4zM18 10c-1.5 0-3 1-3 2v2h6v-2c0-1-1.5-2-3-2z" />
        {/* Person 3 (Child Left) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 16a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 17c-1 0-2 .5-2 1.5V20h4v-1.5c0-1-1-1.5-2-1.5z" />
        {/* Person 4 (Child Right) */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 16a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM14 17c-1 0-2 .5-2 1.5V20h4v-1.5c0-1-1-1.5-2-1.5z" />
    </svg>
);

export const CarCrashIcon: React.FC = () => (
    <svg {...iconProps} xmlns="http://www.w3.org/2000/svg">
        {/* Car body */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.882 9.75H5.118a3.75 3.75 0 00-3.75 3.75v4.5h1.5v-1.5h18v1.5h1.5v-4.5a3.75 3.75 0 00-3.75-3.75z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.118 9.75l1.5-4.5h10.764l1.5 4.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 17.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM16.5 17.25a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
        {/* Crash Graphic: A stylized impact star */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5l1.2 3.6h3.6l-3 2.4 1.2 3.6-3-2.4-3 2.4 1.2-3.6-3-2.4h3.6z" fill="currentColor" opacity="0.9" />
    </svg>
);