import React from 'react';

export default function LoadingSpinner() {
  return (
    <div className="c-loading-spinner">
      <svg>
        <circle
          cx="30"
          cy="30"
          r="20"
          fill="none"
          strokeWidth="3"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  );
}
