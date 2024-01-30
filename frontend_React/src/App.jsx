import React, { useState, useEffect } from 'react';
import BasicLineChart from "./components/ChartsLines.jsx";
import CircularWithValueLabel from './components/CircularWithLabel.jsx';
import webSocketClient from './webSocket.js';

function App() {
  const [cryptoData, setCryptoData] = useState(null);

  useEffect(() => {
    const websocket = webSocketClient(setCryptoData);

    // Cleanup the WebSocket connection when the component unmounts
    return () => {
      websocket.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div>
      {cryptoData && <BasicLineChart cryptoData={cryptoData} />}
      <CircularWithValueLabel />
    </div>
  );
}

export default App;