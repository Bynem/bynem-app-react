import React from 'react';
import * as S from './styles'

export type FooterProps = {
  bottom: boolean
}

export default function Footer({ bottom }: FooterProps) {
  return (
    <S.Footer bottom={bottom}>
      <img src={"/bynem3.png"} width={120} height={12} />
    </S.Footer>
  )
}
