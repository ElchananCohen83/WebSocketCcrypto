package main

import (
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var clients = make(map[*websocket.Conn]bool) // Connected clients

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	// Register new client
	clients[conn] = true

	// Open a connection to the Binance WebSocket
	binanceWebSocketURL := "wss://stream.binance.com:9443/ws/btcusdt@avgPrice"
	binanceConn, _, err := websocket.DefaultDialer.Dial(binanceWebSocketURL, nil)
	if err != nil {
		log.Println("Error connecting to Binance WebSocket:", err)
		return
	}
	defer binanceConn.Close()

	// Continuously forward updates from Binance WebSocket to the connected client
	for {
		_, response, err := binanceConn.ReadMessage()
		if err != nil {
			log.Println("Error reading response from Binance WebSocket:", err)
			return
		}

		// Broadcast the received message to all connected clients
		for client := range clients {
			if err := client.WriteMessage(websocket.TextMessage, response); err != nil {
				log.Println(err)
				delete(clients, client) // Remove disconnected client
				client.Close()
			}
		}
	}
}

func main() {
	// Start the WebSocket server
	http.HandleFunc("/ws", handleWebSocket)

	// Start the HTTP server
	port := 8080
	fmt.Printf("WebSocket server listening on :%d\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}