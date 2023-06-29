const INITIAL_STATE = {
  spaceData: [],
  currentData: null,
  loadingScreen: true,
  spaceName: "",
  activeUsers: [],
  successSnackbar: false,
  failSnackbar: false,
  message: { title: "", data: "" },
  language: "javascript",
  theme: "aura",
  cursorPosition: "1:1",
  fontSize: 15,
};

function spaceReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "updateSpaceData":
      return { ...state, spaceData: action.payload };
    case "updateCurrentData":
      return { ...state, currentData: action.payload };
    case "removeLoadingScreen":
      return { ...state, loadingScreen: false };
    case "updateSpaceName":
      return { ...state, spaceName: action.payload };
    case "updateSuccess":
      return { ...state, successSnackbar: action.payload };
    case "updateFail":
      return { ...state, failSnackbar: action.payload };
    case "updateMessage":
      return { ...state, message: action.payload };
    case "updateActiveUsers":
      return { ...state, activeUsers: action.payload };
    case "updateLanguage":
      return { ...state, language: action.payload };
    case "updateTheme":
      return { ...state, theme: action.payload };
    case "updateCursorPosition":
      return { ...state, cursorPosition: action.payload };
    case "updateFontSize":
      return { ...state, fontSize: action.payload };
    case "resetSpaceState":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default spaceReducer;
