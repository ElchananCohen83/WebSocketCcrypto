import React, { useState } from 'react';
import BasicLineChart from "./components/ChartsLines.jsx";
import CircularWithValueLabel from './components/CircularWithLabel.jsx';

const socket = new WebSocket("ws://localhost:8080/ws");

function App() {
  const [cryptoData, setCryptoData] = useState(null);

  socket.onopen = function (event) {
    console.log("WebSocket connection opened:", event);
    sendMessage("send");
  };

  function sendMessage(message) {
    socket.send(message);
    console.log("Sent message:", message);
  }

  socket.onmessage = function (event) {
    // console.log("WebSocket message received:", event);
    const parsedData = JSON.parse(event.data);
    setCryptoData(parsedData);
  };

  socket.onclose = function (event) {
    console.log("WebSocket connection closed:", event);
  };

  return (
    <div>
      {cryptoData && <BasicLineChart cryptoData={cryptoData} />}
      <CircularWithValueLabel/>
    </div>
  );
}

export default App;
