import asyncio
import websockets

async def handle_client(websocket, path):
    print("Client connected")

    try:
        async for message in websocket:
            print(f"Received from client: {message}") # you got the data here

            response = f"Anger"  #you need to send from here
            print(f"sending to server: {response}")
            await websocket.send(response)

    except websockets.ConnectionClosed:
        print("Client disconnected unexpectedly. Restart server if needed.")

async def main():
    async with websockets.serve(handle_client, "localhost", 8000):
        print("WebSocket server started on ws://localhost:8000")
        await asyncio.Future()  

if __name__ == "__main__":
    asyncio.run(main())
