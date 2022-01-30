import styled from 'styled-components'
import { FooterProps } from '.'

export const Footer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: ${({ bottom }: FooterProps) => (bottom ? '0' : null)};
    left: 0;
    right: 0;
    p{
        font-size: 1rem;
        margin: 0;
    }
    img{
        width: 120px;
        height: 12px;
    }
`
