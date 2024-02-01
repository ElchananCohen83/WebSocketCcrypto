import React from 'react';
import '../styles.css';

const LeftShape = ({ top }) => {
  return (
    <div className="left-shape">
      <div className="left-container">
        <div className="left-arrow" style={{ top: `${top}px` }}></div>
        <div className="left-rectangle" style={{ top: `${top}px` }}>$47,300</div>
      </div>
    </div>
  );
};

export default LeftShape;

