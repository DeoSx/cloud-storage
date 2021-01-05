import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Disk.scss'
import dirLogo from '../../../assets/img/dir.svg'
import fileLogo from '../../../assets/img/file.svg'
import { setCurDir, pushToDir } from '../../../actions/file'

const File = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)

  const openDirectory = (file) => {
    if (file.type === 'dir') {
      dispatch(pushToDir(currentDir))
      dispatch(setCurDir(file._id))
    }
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
    </div>
  )
}

export default File
