import React from 'react';
import './loadingSpinner.scss';
interface LoadingProp {
  isLoading: boolean;
}
function LoadingSpinner({ isLoading }: LoadingProp) {
  return (
    <div className="spinner-container">
      <p className="spinner-container">loading..</p>
      {isLoading ? <div className="spinner" /> : null}
    </div>
  );
}

export default LoadingSpinner;
