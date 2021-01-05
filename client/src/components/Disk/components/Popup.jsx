import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../Disk.scss'
import { setPopupState, createDir } from '../../../actions/file'

import Input from '../../Input/Input'

const Popup = () => {
  const [dirName, setDirName] = useState('')

  const dispatch = useDispatch()
  const popupState = useSelector((state) => state.files.showPopup)
  const currentDir = useSelector((state) => state.files.currentDir)

  const popupHandler = (value) => {
    dispatch(setPopupState(value))
  }

  const createDirHandler = () => {
    dispatch(createDir(currentDir, dirName))
    dispatch(setPopupState('none'))
    setDirName('')
  }

  return (
    <div
      className="popup"
      style={{ display: popupState }}
      onClick={() => popupHandler('none')}
    >
      <div
        className="popup__content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button className="popup__close" onClick={() => popupHandler('none')}>
            X
          </button>
        </div>
        <Input
          type="text"
          placeholder="Введите название папки..."
          value={dirName}
          setValue={setDirName}
        />
        <button className="popup__create" onClick={() => createDirHandler()}>
          Создать
        </button>
      </div>
    </div>
  )
}

export default Popup
