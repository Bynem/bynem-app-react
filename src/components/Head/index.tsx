import React, { useState } from "react";
import * as S from './styles'

export type NavBar = {
  isOpen: boolean
}

export type Home = {
  home: boolean
}

export default function Head({ home }: Home) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (<>
    <S.Nav>
      <div style={{ cursor: "pointer" }}>
        <a href="/" >
          <img style={{ height: "70px", width: "170px" }} src='/bynem01.png' />
        </a>
      </div>
      <S.Hamburger onClick={() => setIsOpen(!isOpen)}>
        <span className='spanHamburger' />
        <span className='spanHamburger' />
        <span className='spanHamburger' />
      </S.Hamburger>
      <S.Menu isOpen={isOpen}>
        {home ?
          (
            <a href="/">
              <S.MenuLink >Inicio</S.MenuLink>
            </a>
          ) : (null)}

        <a href="http://bynem.com.br/">
          <a target="_blank">
            <S.MenuLink >Blog</S.MenuLink>
          </a>
        </a>
        <a href="/meus-simulados">
          <a>
            <S.MenuLink >Meus Simulados</S.MenuLink>
          </a>
        </a>
        <a href="/criar-simulados">
          <a>
            <S.MenuLink >Criar Simulados</S.MenuLink>
          </a>
        </a>
        {/* <a href="/vizualizar/simulado/5">
          <a>
            <S.MenuLink >Vizualizar Simulado</S.MenuLink>
          </a>
        </a> */}
        <a href="/simulado/uuidSimulado">
          <a>
            <S.MenuLink >Execução Simulado</S.MenuLink>
          </a>
        </a>
      </S.Menu>
    </S.Nav>
  </>
  );
}
