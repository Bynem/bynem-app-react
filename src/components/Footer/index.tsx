import React from 'react';
import * as S from './styles'

export type FooterProps = {
  bottom: boolean
}

export default function Footer({ bottom }: FooterProps) {
  return (
    <S.Footer>
      <S.Wrapper>
        <S.ContainerLogo>
          <S.ContainerQuemSomos>
            <S.Title target="_blank" href="https://bynem.com.br/blog/quem-somos/">Quem Somos</S.Title>
          </S.ContainerQuemSomos>
          <S.ContainerContato>
            <S.Title target="_blank" href="https://bynem.com.br/blog/contato/" >Contato</S.Title>
            <S.SubTitle></S.SubTitle>
          </S.ContainerContato>
          <S.ContainerPoliticaDePrivacidade>
            <S.Title target="_blank" href="https://bynem.com.br/blog/politica-de-privacidade/" >Politica de Privacidade</S.Title>
          </S.ContainerPoliticaDePrivacidade>
        </S.ContainerLogo>
        <S.ContainerRedeSociais>
          <S.FacebookIconc />
          <S.TwitterIconc />
          <S.InstagramIconc />
          <S.LinkedInIconc />
        </S.ContainerRedeSociais>
      </S.Wrapper>
    </S.Footer>
  )
}
