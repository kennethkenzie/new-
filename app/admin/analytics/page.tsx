'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '../components/DashboardLayout'
import Analytics from '../../components/admin/Analytics'

export default function AnalyticsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('user')
    
    if (!token || !userData) {
      router.push('/admin')
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      
      // Check if user has dashboard access
      if (!parsedUser.permissions?.includes('dashboard_access')) {
        router.push('/admin')
        return
      }
      
      setUser(parsedUser)
    } catch (error) {
      console.error('Error parsing user data:', error)
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <DashboardLayout user={user}>
      <Analytics />
    </DashboardLayout>
  )
}