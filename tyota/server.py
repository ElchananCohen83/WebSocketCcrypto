import asyncio
import os
import websockets
import http.server
import socketserver

async def handle_websocket(websocket, path):
    try:
        async for message in websocket:
            await websocket.send(message)
    except websockets.exceptions.ConnectionClosedError:
        pass

async def serve_index_html(websocket, path):
    html_path = os.path.join(os.path.dirname(__file__), "index.html")
    with open(html_path, "r") as f:
        html_content = f.read()
        await websocket.send(html_content)

def main():
    port = 8080
    start_server = websockets.serve(handle_websocket, "localhost", port)
    
    # Serve index.html using a simple HTTP server
    handler = http.server.SimpleHTTPRequestHandler
    with socketserver.TCPServer(("", port), handler) as httpd:
        print(f"HTTP server serving at port {port}")
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_until_complete(httpd.serve_forever())

if __name__ == "__main__":
    main()