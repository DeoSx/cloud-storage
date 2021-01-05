import axios from 'axios'
import { SET_USER, LOGOUT } from '../constrants'

export const loginAction = (payload) => ({ type: SET_USER, payload })
export const logoutAction = () => ({ type: LOGOUT })

export const registration = async (email, password) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/registration',
      { email, password }
    )

    alert(response.data.message)
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    })
    localStorage.setItem('token', `Bearer ${response.data.token}`)
    dispatch(loginAction(response.data))
  } catch (e) {
    alert(e.response.data.message)
  }
}

export const getUser = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:5000/api/auth/user', {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    })
    dispatch(loginAction(response.data))
  } catch (e) {}
}
