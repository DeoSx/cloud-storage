import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Disk.scss'
import { fetchFiles, setPopupState, setCurDir } from '../../actions/file'
import FileList from './components/FilesList'
import Popup from './components/Popup'

const Disk = () => {
  const currentDir = useSelector((state) => state.files.currentDir)
  const dirStack = useSelector((state) => state.files.dirStack)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFiles(currentDir))
  }, [currentDir, dispatch])

  const popupHandler = () => {
    dispatch(setPopupState('flex'))
  }

  const backDirHandler = () => {
    const prevDir = dirStack.pop()
    dispatch(setCurDir(prevDir))
  }

  return (
    <div className="disk">
      <div className="disk__btns">
        {dirStack.length ? (
          <button className="disk__back" onClick={() => backDirHandler()}>
            Назад
          </button>
        ) : (
          ''
        )}
        <button className="disk__create" onClick={() => popupHandler()}>
          Создать папку
        </button>
      </div>
      <FileList />
      <Popup />
    </div>
  )
}

export default Disk
