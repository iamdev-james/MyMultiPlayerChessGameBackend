

/**
 * Here is where we should register event listeners and emitters. 
 */

 var io
 var gameSocket
 // gamesInSession stores an array of all active socket connections
 var gamesInSession = []
 
 
 const initializeGame = (sio, socket) => {
     /**
      * initializeGame sets up all the socket event listeners. 
      */
 
     // initialize global variables.
     io = sio 
     gameSocket = socket 
 
     // pushes this socket to an array which stores all the active sockets.
     gamesInSession.push(gameSocket)
 
     // Run code when the client disconnects from their socket session. 
     gameSocket.on("disconnect", onDisconnect)
 
     // Sends new move to the other socket session in the same room. 
     gameSocket.on("new move", newMove)
 
     // User creates new game room after clicking 'submit' on the frontend
     gameSocket.on("createNewGame", createNewGame)
 
     // User joins gameRoom after going to a URL with '/game/:gameId' 
     gameSocket.on("playerJoinGame", playerJoinsGame)
 
     gameSocket.on('request username', requestUserName)
 
     gameSocket.on('recieved userName', recievedUserName)
 
     // register event listeners for video chat app:
     videoChatBackend()
 }
 
 function videoChatBackend() {
  // main function listeners
  gameSocket.on("callUser", (data) => {
      io.to(data.userToCall).emit('hey', {signal: data.signalData, from: data.from});
  })

  gameSocket.on("acceptCall", (data) => {
      io.to(data.to).emit('callAccepted', data.signal);
  })
}