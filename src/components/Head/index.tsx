import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/auth";
import * as S from './styles'

export type NavBar = {
  isOpen: boolean
}

export type Home = {
  home: boolean
}

export default function Head({ home }: Home) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
    const history = useHistory();
    const {setUser} = useAuth()
    const user = JSON.parse(localStorage.getItem("user"))
    
  function sair() {
    setUser({logout: true}) 
    localStorage.removeItem("user")
    history.push('/login')
  }

  function verificaLogadoEredirect() {
    if (user) {
        history.push(`/criar-simulados`)
        return
    } else {
        toast.warning('Você precisa ter uma conta antes')
    }
}

  return (<>
    <S.Nav>
      <div style={{ cursor: "pointer", padding: '8px' }}>
        <a href="/" >
          <img style={{ height: "40px", width: "100px" }} src='/bynem01.png' />
        </a>
      </div>
      <S.Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span className='spanHamburger' />
        <span className='spanHamburger' />
        <span className='spanHamburger' />
      </S.Hamburger>
      <S.Menu isOpen={isOpen}>
          {home ?
            <a href="/">
              <S.MenuLink >Inicio</S.MenuLink>
            </a>
          : 
          null}

        <a href="http://bynem.com.br/">
          <a target="_blank">
            <S.MenuLink >Blog</S.MenuLink>
          </a>
        </a>
        {user &&   
        <a href="/meus-simulados">
          <a>
            <S.MenuLink >Meus Simulados</S.MenuLink>
          </a>
        </a>}
        <a onClick={() => verificaLogadoEredirect()}>
          <a>
            <S.MenuLink >Criar Simulados</S.MenuLink>
          </a>
        </a>
        {user &&  
        <a href="/simulados-favoritos">
            <S.MenuLink >Meus Simulados favoritos</S.MenuLink>
        </a>}
        {user ? 
        <a>
          <S.MenuLink onClick={sair} >Sair</S.MenuLink>
        </a> :
        <a href="/login">
            <S.MenuLink >Login</S.MenuLink>
        </a>
      }
      </S.Menu>
    </S.Nav>
  </>
  );
}
