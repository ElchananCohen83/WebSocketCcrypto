import WebSocket from 'ws'

const x = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@avgPrice');

x.onmessage = (event) => {
  console.log(JSON.parse(event.data));
}