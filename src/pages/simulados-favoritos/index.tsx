import React, { useState, useEffect } from 'react'
import SimuladosFavoritosTemplate from '../../templates/SimuladosFavoritos'
import Loading from '../../components/Loading'

export default function SimuladosFavoritos() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, []);

  return <>
    {
      loading ?
        (
          <Loading />
        ) :
        (<>
          <SimuladosFavoritosTemplate />
        </>
        )
    }
  </>
}
