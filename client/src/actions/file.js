import axios from 'axios'
import {
  ADD_FILE,
  POPUP_STATE,
  PUSH_TO_STACK,
  SET_CUR_DIR,
  SET_FILES,
  DELETE_FILE
} from '../constrants'

export const setFiles = (files) => ({ type: SET_FILES, payload: files })
export const setCurDir = (dir) => ({ type: SET_CUR_DIR, payload: dir })
export const addFile = (file) => ({ type: ADD_FILE, payload: file })
export const setPopupState = (display) => ({
  type: POPUP_STATE,
  payload: display
})
export const pushToDir = (dir) => ({ type: PUSH_TO_STACK, payload: dir })
export const deleteFileAction = (file) => ({ type: DELETE_FILE, payload: file })

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

export const uploadFile = (file, dirId) => async (dispatch) => {
  try {
    const formData = new FormData()
    formData.append('file', file)
    if (dirId) {
      formData.append('parent', dirId)
    }
    const response = await axios.post(
      'http://localhost:5000/api/file/upload',
      formData,
      {
        headers: {
          Authorization: localStorage.getItem('token')
        },
        onUploadProgress: (progressEvent) => {
          const totalLength = progressEvent.lengthComputable
            ? progressEvent.total
            : progressEvent.target.getResponseHeader('content-length') ||
              progressEvent.target.getResponseHeader(
                'x-decompressed-content-length'
              )
          console.log('total', totalLength)
          if (totalLength) {
            let progress = Math.round(
              (progressEvent.loaded * 100) / totalLength
            )
            console.log(progress)
          }
        }
      }
    )
    dispatch(addFile(response.data))
  } catch (e) {
    console.error(e)
    alert(e.response.data.message)
  }
}

export const fileDownload = async (file) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/file/download?id=${file._id}`,
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    )
    if (response.status === 200) {
      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = file.name
      document.body.appendChild(link)
      link.click()
      link.remove()
    }
  } catch (e) {
    console.error(e)
    alert(e.response.data.message)
  }
}

export const deleteFile = (file) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/file?id=${file._id}`,
      {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      }
    )
    dispatch(deleteFileAction(file))
    alert(response.data.message)
  } catch (e) {
    console.error(e)
    alert(e.response.data.message)
  }
}
