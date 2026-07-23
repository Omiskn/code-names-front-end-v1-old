import { createContext, useContext, useReducer } from "react";
import { roomReducer, ROOM_ACTIONS } from "../reducers/roomReducer";
// import { useSocket } from "./socketContext";

const RoomContext = createContext();

export const initialState = {
  roomId: null,

  hoster: null,
  // { id: "", name: "" }

  status: "waiting",
  // waiting | playing

  players: [
    // {
    //   id: "",
    //   name: "",
    //   team: null,        // RED | BLUE | null
    //   role: null,        // SPYMASTER | OPERATIVE | null
    //   isReady: false
    // }
  ],

  game: null,
  /* {board :{startingTeam "blue",cards,}}
   */
};

export function RoomProvider({ children }) {
  const [state, dispatch] = useReducer(roomReducer, initialState);
  const playerId = localStorage.getItem("playerId");
  const me = state.players?.find((p) => p.id === playerId);

  const joinRoom = ({ roomId, hoster }) => {
    dispatch({
      type: ROOM_ACTIONS.JOIN_ROOM,
      payload: { roomId, hoster },
    });
  };

  const updatePlayers = (players) => {
    dispatch({ type: ROOM_ACTIONS.UPDATE_PLAYERS, payload: { players } });
  };

  const setRoom = (room) => {
    dispatch({ type: ROOM_ACTIONS.SET_ROOM, payload: room });
  };

  const leaveRoom = () => {
    dispatch({ type: ROOM_ACTIONS.LEAVE_ROOM });
  };

  const updateGame = (game) => {
    dispatch({ type: ROOM_ACTIONS.UPDATE_GAME, payload: game });
  };

  return (
    <RoomContext.Provider
      value={{
        room: state,
        joinRoom,
        updatePlayers,
        updateGame,
        leaveRoom,
        setRoom,
        me,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  return useContext(RoomContext);
}
