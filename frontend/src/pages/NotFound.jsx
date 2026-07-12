import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="card !w-full max-w-lg p-10 flex flex-col items-center justify-center">
        <h1 className="text-[6rem] leading-none font-bold text-brand-primary drop-shadow-m">404</h1>
        <h2 className="text-h2 font-bold mt-4 mb-2 text-text-primary uppercase tracking-tight">System Out of Bounds</h2>
        <p className="text-body text-text-secondary mb-8 max-w-sm">
          The requested coordinate does not exist in the active TransitOps grid. Please verify your routing parameters.
        </p>
        <Link to="/" className="card-button uppercase">
          Return to Hub
        </Link>
      </div>
    </div>
  );
}
