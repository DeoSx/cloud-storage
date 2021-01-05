import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Disk.scss'
import dirLogo from '../../../assets/img/dir.svg'
import fileLogo from '../../../assets/img/file.svg'
import {
  setCurDir,
  pushToDir,
  fileDownload,
  deleteFile
} from '../../../actions/file'

const File = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)

  const openDirectory = (file) => {
    if (file.type === 'dir') {
      dispatch(pushToDir(currentDir))
      dispatch(setCurDir(file._id))
    }
  }

  const downloadClickHandler = (e) => {
    e.stopPropagation()
    fileDownload(file)
  }

  const deleteFileHandler = (e) => {
    e.stopPropagation()
    dispatch(deleteFile(file))
  }

  return (
    <div className="file" onClick={() => openDirectory(file)}>
      <img
        src={file.type === 'dir' ? dirLogo : fileLogo}
        alt=""
        className="file__img"
      />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
      {file.type !== 'dir' && (
        <button
          onClick={(e) => downloadClickHandler(e)}
          className="file__btn file__download"
        >
          download
        </button>
      )}
      <button
        className="file__btn file__delete"
        onClick={(e) => deleteFileHandler(e)}
      >
        delete
      </button>
    </div>
  )
}

export default File
