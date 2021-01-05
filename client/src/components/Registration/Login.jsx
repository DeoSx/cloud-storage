import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import Input from '../Input/Input'
import './Autherization.scss'
import { login } from '../../actions/user'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  return (
    <div className="autherization">
      <div className="autherization__header">Авторизация</div>
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
        onClick={() => dispatch(login(email, password))}
      >
        Войти
      </button>
    </div>
  )
}

export default Login
