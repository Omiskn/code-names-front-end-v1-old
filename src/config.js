export const COLORS = {
  neutral: {
    outColor: "#f3dfc1",
    innerColor: "#ebd9b8",
    borderAndLine: "#a49170",
    picBorder: "#f5ead1",
  },
  red: {
    outColor: "#fbc48c",
    innerColor: "#e77939",
    borderAndLine: "#aa532c",
    picBorder: "#faba82",
  },
  blue: {
    outColor: "#92d7ff",
    innerColor: "#24a4cd",
    borderAndLine: "#13768c",
    picBorder: "#83d1fb",
    hue: "170deg",
  },
  assassin: {
    outColor: "#525352",
    innerColor: "#5d5d5e",
    borderAndLine: "#3f3f3f",
    picBorder: "#7a7a7a",
  },
};

// export const SOCKET_EVENTS = {
//   JOIN_ROOM: "join_room",
//   LEAVE_ROOM: "leave_room",
//   CREATE_ROOM: "create_room",
//   START_GAME: "start_game",
//   SEND_CLUE: "send_clue",
//   SELECT_WORD: "select_word",
//   UPDATE_GAME: "update_game",
// };

export const SOCKET_EVENTS = {
  CREATE_ROOM: "create_room",
  JOIN_ROOM: "join_room",
  LEAVE_ROOM: "leave_room",
  ROOM_UPDATE: "room_update",
  SELECT_TEAM: "select_team",
  SELECT_ROLE: "select_role",
  TOGGLE_READY: "toggle_ready",
  START_GAME: "start_game",
  SEND_CLUE: "send_clue",
  SELECT_WORD: "select_word",
  GAME_UPDATE: "game_update",
  UPDATE_PLAYERS: "UPDATE_PLAYERS", // البورد و الحالة أثناء اللعب
  SEND_ROOM_STATE: "send_room_state",
  END_TURN: "end_turn",
  GET_ROOM_STATE: "GET_ROOM_STATE",
};
// background-color: #24a4cd;
// border-color: #13768c;
// background-color: #92d7ff;
//     border-color: #83d1fb;
