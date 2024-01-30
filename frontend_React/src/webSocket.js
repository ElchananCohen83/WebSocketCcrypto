export default function webSocketClient(setCryptoData) {
  const socket = new WebSocket("ws://localhost:8080/ws");

  socket.onopen = function (event) {
    console.log("WebSocket connection opened:", event);
    sendMessage("send");
  };

  function sendMessage(message) {
    socket.send(message);
    console.log("Sent message:", message);
  }

  socket.onmessage = function (event) {
    const parsedData = JSON.parse(event.data);
    setCryptoData(parsedData);
  };

  socket.onclose = function (event) {
    console.log("WebSocket connection closed:", event);
  };

  return socket;
}
