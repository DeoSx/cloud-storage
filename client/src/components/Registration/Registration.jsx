import React, { useState } from 'react'

import Input from '../Input/Input'
import './Autherization.scss'
import { registration } from '../../actions/user'

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="autherization">
      <div className="autherization__header">Регистрация</div>
      <Input
        value={email}
        setValue={setEmail}
        type="text"
        placeholder="Введите email..."
      />
      <Input
        value={password}
        setValue={setPassword}
        type="password"
        placeholder="Введите пароль..."
      />
      <button
        className="autherization__btn"
        onClick={() => registration(email, password)}
      >
        Войти
      </button>
    </div>
  )
}

export default Registration
