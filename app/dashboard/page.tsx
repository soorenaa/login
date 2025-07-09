'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './dashboard.module.scss'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img 
          src={user.picture.thumbnail} 
          alt="User" 
          className={styles.avatar}
        />
        <h1 className={styles.title}>
          Welcome, {user.name.first} {user.name.last}!
        </h1>
        <p className={styles.phone}>Phone: {user.phone}</p>
        <button onClick={logout} className={styles.logoutButton}>
          خروج
        </button>
      </div>
    </div>
  )
}