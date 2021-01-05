import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './Disk.scss'
import { fetchFiles } from '../../actions/file'
import FileList from './components/FilesList'

const Disk = () => {
  const currentDir = useSelector((state) => state.files.currentDir)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFiles(currentDir))
  }, [currentDir, dispatch])

  return (
    <div className="disk">
      <div className="disk__btns">
        <button className="disk__back">Назад</button>
        <button className="disk__create">Создать папку</button>
      </div>
      <FileList />
    </div>
  )
}

export default Disk
