import websocket
import json

def on_message(ws, message):
    data = json.loads(message)
    print(data)

socket_url = 'wss://stream.binance.com:9443/ws/btcusdt@avgPrice'
ws = websocket.WebSocketApp(socket_url, on_message=on_message)

ws.run_forever()
