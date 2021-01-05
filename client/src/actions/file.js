import axios from 'axios'
import {
  ADD_FILE,
  POPUP_STATE,
  PUSH_TO_STACK,
  SET_CUR_DIR,
  SET_FILES
} from '../constrants'

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const setCurDir = (dir) => ({ type: SET_CUR_DIR, payload: dir })
export const addFile = (file) => ({ type: ADD_FILE, payload: file })
export const setPopupState = (display) => ({
  type: POPUP_STATE,
  payload: display
})
export const pushToDir = (dir) => ({ type: PUSH_TO_STACK, payload: dir })

export const fetchFiles = (dirId) => async (dispatch) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/file${dirId ? '?parent=' + dirId : ''}`,
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    )
    dispatch(setFiles(response.data))
  } catch (e) {
    console.error(e)
  }
}

export const createDir = (dirId, name) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/file`,
      {
        name,
        parent: dirId,
        type: 'dir'
      },
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    )
    dispatch(addFile(response.data))
  } catch (e) {
    console.error(e)
    alert(e.response.data.message)
  }
}
