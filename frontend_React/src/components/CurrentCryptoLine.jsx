import React from 'react';
import '../styles.css';

const CurrentCryptoLine = ({ top, cryptoData }) => {
  if(!cryptoData){
    cryptoData=0
  }
  return (
    <div className="left-shape">
      <div className="left-container">
        <div className="left-arrow" style={{ top: `${top}px` }}></div>
        <div className="left-rectangle" style={{ top: `${top}px` }}>${cryptoData}</div>
      </div>
    </div>
  );
};

export default CurrentCryptoLine;

