import React from 'react';
import './loadingSpinner.scss';
interface LoadingProp {
  isLoading: boolean;
}
function LoadingSpinner({ isLoading }: LoadingProp) {
  return (
    <div className="spinner-container">
      <p className="spinner-container">정보 업데이트중 입니다</p>
      {isLoading ? <div className="spinner" /> : null}
    </div>
  );
}

export default LoadingSpinner;
