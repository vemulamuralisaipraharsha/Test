"use client";

import { useEffect, useState } from 'react';
import { Set_emoji } from '@/app/globals';

const WebSocketClient = ({ data }) => {
  const [ws, setWs] = useState(null);
  useEffect(() => {
    console.log("WebSocketClient is initializing...");

    const websocket = new WebSocket('ws://localhost:8000');
    setWs(websocket); // Store the websocket instance in state

    websocket.onopen = () => {
      console.log('Connected to server');
    };

    websocket.onmessage = (event) => {
      console.log('Received from server:', event.data);
      Set_emoji(event.data);
    };

    websocket.onclose = () => {
      console.log('Disconnected from server');
    };

    websocket.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      websocket.close();
    };
  }, []); // The empty array ensures this effect runs only once when the component mounts

  // Function to send data to the WebSocket server
  const sendData = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      console.log('Sending to server:', data.message_data);
      ws.send(data.message_data); // Send the data from props
    } else {
      console.error("WebSocket is not connected.");
    }
  };

  return (
    <div>
      <button
        onClick={sendData}
        className={`bg-blue-900 text-white font-semibold p-2 cursor-pointer rounded-md 
          ${data.message_data ? 'hover:bg-blue-900' : 'bg-blue-300 cursor-not-allowed'}`}
        disabled={!data.message_data}
      >
        Send
      </button>
    </div>
  );
};

export default WebSocketClient;
