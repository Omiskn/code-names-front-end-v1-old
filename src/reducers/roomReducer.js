export const ROOM_ACTIONS = {
  JOIN_ROOM: "JOIN_ROOM",
  UPDATE_PLAYERS: "UPDATE_PLAYERS",
  LEAVE_ROOM: "RESET_ROOM",
  REMOVE_PLAYER: "REMOVE_PLAYER",
  SELECT_TEAM: "SELECT_TEAM",
  SELECT_ROLE: "SELECT_ROLE",
  TOGGLE_READY: "TOGGLE_READY",
  SET_STATUS: "SET_STATUS",
  SET_ROOM: "SET_ROOM",
  UPDATE_GAME: "UPDATE_GAME",
};

export function roomReducer(state, action) {
  switch (action.type) {
    case ROOM_ACTIONS.JOIN_ROOM:
      return {
        ...state,
        roomId: action.payload.roomId,
        hoster: action.payload.hoster,
        players: [],
      };
    case ROOM_ACTIONS.UPDATE_PLAYERS:
      return {
        ...state,
        players: action.payload.players,
      };
    case ROOM_ACTIONS.UPDATE_ROOM:
      return {
        ...action.payload,
      };
    case ROOM_ACTIONS.SELECT_TEAM:
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.id
            ? { ...player, team: action.payload.team }
            : player
        ),
      };

    case ROOM_ACTIONS.SELECT_ROLE:
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload.id
            ? { ...player, role: action.payload.role }
            : player
        ),
      };

    case ROOM_ACTIONS.TOGGLE_READY:
      return {
        ...state,
        players: state.players.map((player) =>
          player.id === action.payload
            ? { ...player, isReady: !player.isReady }
            : player
        ),
      };

    case ROOM_ACTIONS.SET_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    case ROOM_ACTIONS.REMOVE_PLAYER:
      return {
        ...state,
        players: state.players.filter((player) => player.id !== action.payload),
      };

    case ROOM_ACTIONS.SET_ROOM:
      return {
        ...action.payload,
      };

    case ROOM_ACTIONS.UPDATE_GAME:
      return {
        ...state,
        game: action.payload,
      };

    case ROOM_ACTIONS.LEAVE_ROOM:
      return {
        roomId: null,
        playerName: "",
        isHost: false,
        players: [],
      };
    default:
      return state;
  }
}
