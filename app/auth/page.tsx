'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button/Button'
import styles from './auth.module.scss'
import Input from '../components/input/Input'

export default function AuthPage() {
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()
 
  const validatePhone = (phone: string) => {
    const iranPhoneRegex = /^(\+98|0)?9\d{9}$/
    return iranPhoneRegex.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validatePhone(phone)) {
      setError('لطفا شماره تلفن معتبر ایران وارد کنید')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      await login(phone)
      router.push('/dashboard')
    } catch (err) {
      setError('خطا در ورود. لطفا مجددا تلاش کنید.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container} dir='rtl'>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={styles.title}>ورود به سیستم</h1>
        
        <Input
          type="tel"
          placeholder="شماره تلفن همراه (مثال: 09123456789)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={error}
        />
        
        <Button type="submit" disabled={loading}>
          {loading ? 'در حال ورود...' : 'ورود'}
        </Button>
      </form>
    </div>
  )
}