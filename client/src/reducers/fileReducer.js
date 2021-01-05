import {
  SET_CUR_DIR,
  SET_FILES,
  ADD_FILE,
  POPUP_STATE,
  PUSH_TO_STACK
} from '../constrants'

const initialState = {
  files: [],
  currentDir: null,
  showPopup: 'none',
  dirStack: []
}

export default function fileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload
      }
    case SET_CUR_DIR:
      return {
        ...state,
        currentDir: action.payload
      }
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload]
      }
    case POPUP_STATE:
      return {
        ...state,
        showPopup: action.payload
      }
    case PUSH_TO_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload]
      }
    default:
      return state
  }
}
