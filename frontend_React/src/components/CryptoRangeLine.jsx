import React from 'react';
import '../styles.css';

const CryptoRangeLine = ({ top, cryptoData }) => {
  if(!cryptoData){
    cryptoData=0
  }
  return (
    <div className="range-shape">
      <div className="range-container">
        <div className="range-rectangle" style={{ top: `${top}px` }}>${cryptoData}</div>
      </div>
    </div>
  );
};

export default CryptoRangeLine;
