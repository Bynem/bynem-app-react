import React from 'react';
import * as S from './styles'

export type FooterProps = {
  bottom: boolean
}

export default function Footer({ bottom }: FooterProps) {
  return (
    <S.Footer bottom={bottom}>
    </S.Footer>
  )
}
