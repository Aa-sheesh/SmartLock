import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
      {/* Rotating shield icon */}
      <div className="flex items-center justify-center">
        <svg
          className="w-16 h-16 text-blue-500 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            className="opacity-25"
            fill="currentColor"
            d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M12 22c-1.1 0-2-.9-2-2h4c0 1.1-.9 2-2 2z"
          />
        </svg>
      </div>
      {/* Optional loading message */}
      <p className="mt-4 text-xl text-blue-400 font-mono">
        Securing your data...
      </p>
    </div>
  );
}

export default Loading;
