import { RoomProvider } from "./contexts/roomContext";
import { SocketProvider } from "./contexts/socketContext";
import { ToastProvider } from "./contexts/toastContext";
import { Route, Routes } from "react-router";
import RoomEntry from "./pages/entry/Entry";
import RoomLobby from "./pages/loobby/Lobby";
import Board from "./pages/board/Board";
import { v4 as uuidv4 } from "uuid";

function App() {
  const playerId = localStorage.getItem("playerId");
  if (!playerId) {
    const id = uuidv4().slice(24, 32);
    localStorage.setItem("playerId", id);
  }
  return (
    <ToastProvider>
      <SocketProvider>
        <RoomProvider>
          <Routes>
            <Route path="/" element={<RoomEntry />} />
            <Route path="lobby/:roomId" element={<RoomLobby />} />
            <Route path="board" element={<Board />} />
          </Routes>
        </RoomProvider>
      </SocketProvider>
    </ToastProvider>
  );
}

export default App;
