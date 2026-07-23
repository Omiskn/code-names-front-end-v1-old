// import Card from "./components/board/Card";
import { RoomProvider } from "./contexts/roomContext";
import { SocketProvider } from "./contexts/socketContext";
import { Route, Routes } from "react-router";
import RoomEntry from "./pages/entry/Entry";
import RoomLobby from "./pages/loobby/Lobby";
import Board from "./pages/board/Board";
import { v4 as uuidv4 } from "uuid";

function App() {
  const playerId = localStorage.getItem("playerId");
  if (!playerId) {
    console.log("hello");
    const id = uuidv4().slice(24, 32);
    localStorage.setItem("playerId", id);
  }
  return (
    <SocketProvider>
      <RoomProvider>
        <Routes>
          <Route path="/" element={<RoomEntry />} />
          <Route path="lobby/:roomId" element={<RoomLobby />} />
          <Route path="board" element={<Board />} />
        </Routes>
      </RoomProvider>
      {/* <Card color={COLORS.blue} word="international" /> */}
    </SocketProvider>
  );
}

export default App;
