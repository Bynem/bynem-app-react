import React, { useState, useEffect } from 'react'
import MySimulateds from '../templates/MySimulateds'
import Loading from '../components/Loading'

export default function MeusSimulados() {
  const [loading, setLoading] = useState(false)

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
          <MySimulateds />
        </>
        )
    }
  </>
}
