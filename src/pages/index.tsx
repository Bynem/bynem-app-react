import React, { useState, useEffect } from 'react'
import HomePage from '../templates/Home'
import Loading from '../components/Loading'
import { useAuth } from '../hooks/auth'

export default function Home() {
  const [loading, setLoading] = useState(false)
    const user = JSON.parse(localStorage.getItem("user"))
  console.log('user', user)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  return <>
    {
      loading ?
        (
          <Loading />
        ) :
        (<>
          <HomePage />
        </>
        )
    }
  </>
}
