import React from 'react';
import * as S from './styles'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export type FooterProps = {
  bottom: boolean
}

export default function Footer({ bottom }: FooterProps) {
  return (
    <S.Footer bottom={bottom}>
      <S.Wrapper>

        <S.ContainerLogo>
          <img src="/bynem0.png" alt="Logo do footer" />
          <S.ContainerRedeSociais>
            <FacebookIcon />
            <TwitterIcon />
            <InstagramIcon />
            <LinkedInIcon />
          </S.ContainerRedeSociais>
        </S.ContainerLogo>
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
      </S.Wrapper>
      <S.ContainerCopiRight>
        <S.LineLeft />
        <S.Bynem><span>Bynem</span></S.Bynem>
        <S.LineRight />
      </S.ContainerCopiRight>
    </S.Footer>
  )
}
