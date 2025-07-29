import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Suppress ResizeObserver and other common React development errors
const originalError = console.error;
console.error = (...args) => {
  const errorMessage = args[0];
  if (typeof errorMessage === 'string') {
    if (errorMessage.includes('ResizeObserver') || 
        errorMessage.includes('ResizeObserver loop') ||
        errorMessage.includes('ResizeObserver loop completed with undelivered notifications') ||
        errorMessage.includes('ResizeObserver loop limit exceeded')) {
      return;
    }
  }
  originalError.apply(console, args);
};

// Also suppress React warnings about ResizeObserver
const originalWarn = console.warn;
console.warn = (...args) => {
  const warnMessage = args[0];
  if (typeof warnMessage === 'string' && 
      (warnMessage.includes('ResizeObserver') || 
       warnMessage.includes('ResizeObserver loop'))) {
    return;
  }
  originalWarn.apply(console, args);
};

// Suppress ResizeObserver errors globally
const originalConsoleError = console.error;
console.error = (...args) => {
  if (args[0] && typeof args[0] === 'string' && 
      args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
    return;
  }
  originalConsoleError.apply(console, args);
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 