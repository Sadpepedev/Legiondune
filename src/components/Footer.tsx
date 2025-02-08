import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-12 text-center text-sm text-gray-400 space-y-4">
      <p>
        Disclaimer: We are not affiliated with Legion and do not offer financial or trading advice. 
        This website is purely for informational purposes to assist in tracking prior ICO performance. 
        Always conduct your own research before making any investment decisions.
      </p>
      <p>
        Built by{' '}
        <a 
          href="https://x.com/dustybeerbong" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#00ffee] hover:text-[#37fffc] transition-colors"
        >
          Sadpepe.exe
        </a>
      </p>
    </footer>
  );
};