import { SET_CUR_DIR, SET_FILES } from '../constrants'

const initialState = {
  files: [],
  currentDir: null
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
    default:
      return state
  }
}
