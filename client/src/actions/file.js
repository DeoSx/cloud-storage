import axios from 'axios'
import { SET_CUR_DIR, SET_FILES } from '../constrants'

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const setCurDir = (dir) => ({ type: SET_CUR_DIR, payload: dir })

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
