import React from 'react'
import style from './Error.module.css'

export default function Error({message}) {
  return <div className={style.errorMsg}>
    <i className="fa fa-times-circle"></i>
    Error :{message}
  </div>
}
