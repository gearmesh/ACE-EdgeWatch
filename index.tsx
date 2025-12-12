
/**
 * Application Entry Point
 * 
 * This file is responsible for:
 * 1. Finding the root DOM element in the HTML.
 * 2. Mounting the React root.
 * 3. wrapping the App in StrictMode and initializing performance monitoring (SpeedInsights).
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SpeedInsights } from "@vercel/speed-insights/react"

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>
);
