import React, { useState, useEffect } from 'react';
import BasicLineChart from "./components/ChartsLines.jsx";
import webSocketClient from './webSocket.js';

function App() {
  const [cryptoData, setCryptoData] = useState(null);

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
    <div>
      {cryptoData && <BasicLineChart cryptoData={cryptoData} />}
    </div>
  );
}

export default App;
