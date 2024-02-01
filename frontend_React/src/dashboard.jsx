import React, { useState, useEffect } from 'react';
import BasicLineChart from "./components/ChartsLines.jsx";
import webSocketClient from './webSocket.js';
import LeftShape from './components/LeftShape .jsx';
import CircularWithValueLabel from './components/CircularWithLabel.jsx';
import './styles.css'; // Assuming the styles.css file contains the arrow styles

export default function Dashboard() {
  const [cryptoData, setCryptoData] = useState(null);
  const [lastPointHeight, setLastPointHeight] = useState(null);

  // Callback function to receive the height value
  const handleLastPointHeightChange = (top) => {
    setLastPointHeight(top);
  };

  console.log(lastPointHeight);

  useEffect(() => {
    const setupWebSocket = async () => {
      const websocket = webSocketClient(setCryptoData);

      // Cleanup the WebSocket connection when the component unmounts
      return () => {
        websocket.close();
      };
    };

    setupWebSocket();
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div style={{ background: "#272042", height: '100vh', position: 'relative' }}>
      {cryptoData && <BasicLineChart cryptoData={cryptoData} onLastPointHeightChange={handleLastPointHeightChange} />}
      <LeftShape top={lastPointHeight} />
      <div id='circular-white' className='circular-timer'>
        <CircularWithValueLabel color="white" seconds={30} circularProgress={340} />
      </div>
      <div id='circular-red' className='circular-timer'>
        <CircularWithValueLabel color="#DD4830" seconds={60} circularProgress={170} />
      </div>
    </div>
  );
}