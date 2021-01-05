import { SET_USER, LOGOUT } from '../constrants'

const initialState = {
  currentUser: {},
  isAuth: (localStorage.getItem('token') && true) || false,
  token: localStorage.getItem('token') || ''
}

export default function fileReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload.user,
        isAuth: true,
        token: action.payload.token
      }
    case LOGOUT:
      localStorage.removeItem('token')
      return {
        ...state,
        currentUser: {},
        isAuth: false,
        token: ''
      }
    default:
      return state
  }
}
