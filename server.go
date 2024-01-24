package main

import (
	"fmt"
	"log"
	"net/http"
	// "path/filepath"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}
	defer conn.Close()

	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}
	}
}

// func handleIndex(w http.ResponseWriter, r *http.Request) {
// 	http.ServeFile(w, r, filepath.Join(".", "index.html"))
// }

func main() {
	http.HandleFunc("/ws", handleWebSocket)
	// http.HandleFunc("/", handleIndex) // Handle requests to the root ("/") with handleIndex

	port := 8080
	fmt.Printf("WebSocket server listening on :%d\n", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}
