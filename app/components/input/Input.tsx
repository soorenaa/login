'use client'

import { ChangeEvent } from 'react'
import styles from './Input.module.scss'

type InputProps = {
  type?: string
  placeholder?: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  error?: string
  className?: string
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className = ''
}: InputProps) {
  return (
    <div className={`${styles.inputContainer} ${className} `} >
      <input
       maxLength={11}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.input} ${error ? styles.error : ''}`}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}