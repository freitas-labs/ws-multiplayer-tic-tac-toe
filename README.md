# ws-multiplayer-tic-tac-toe

Getting an hands-on on websockets with a multiplayer tic tac toe

## Summary

Never had prior experience with websockets and wanted to get the hands dirty with a quick project. Decide to build a multiplayer tic-tac-toe.

Some of the things I've learned while building this project:

- Websockets always start with a GET HTTP Request and the headers "Upgrade: WebSocket; Connection: Upgrade", and the server responds with 101 Switching Protocols
- The mental model for designing APIs with websockets is completely different than the traditional "REST" APIs. In traditional REST APIs, routing is based on the request path, method, parameters, etc. In websockets, routing needs to be handled via the received body since "requests" are sent in a single connection.
- Transmitting data in websockets is really FAST
- To achieve broadcast replies you gotta keep track of the open connection clients
- To close a connection, the client & server can disconnect. Additionally, a ping-pong mechanism is used to validate if the client/server is still awake.

![image](https://github.com/freitas-labs/ws-multiplayer-tic-tac-toe/assets/26190214/f5094011-9b9d-45bc-a944-85be123bf387)

## Demo

https://github.com/freitas-labs/ws-multiplayer-tic-tac-toe/assets/26190214/13ea00b7-4b32-4b8e-8001-e23229e534d4
