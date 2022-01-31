import styled from 'styled-components'
import { FooterProps } from '.'

export const Footer = styled.footer`
    padding-top: 20px;
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
export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`

export const ContainerBynem = styled.div`


`





export const ContainerLogo = styled.div`
    text-align: center;
    width: 300px;
    height: 40px;
    display: flex;
    cursor: pointer;
    align-items: center;
    flex-direction: column;
    img{
        height: 40px;
        width: 160px;
    }

`

export const ContainerQuemSomos = styled.div`
    text-align: center;
    justify-content: center;
    width: 300px;
    height: 40px;
    display: flex;
    flex-direction: column;
`

export const ContainerContato = styled.div`
    width: 300px;
    height: 40px;
    justify-content: center;
    text-align: center;
    display: flex;
    flex-direction: column;

`

export const ContainerPoliticaDePrivacidade = styled.div`
    text-align: center;
    justify-content: center;
    width: 300px;
    height: 40px;
    display: flex;
    flex-direction: column;
`

export const ContainerCopiRight = styled.div`
    text-align: center;
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`

export const LineLeft = styled.div`
    width: 35%;
    height: 3px;
    background-color: #E414B2;
    margin-left: 5%;
    border-radius: 10px;
    transition: 0.8s;
    &:hover {
        background-color: #46a6e6;

    }
`
export const LineRight = styled.div`
    width: 35%;
    height: 3px;
    border-radius: 10px;
    margin-right: 5%;
    background-color: #E414B2;
    transition: 0.8s;
    &:hover {
        background-color: #46a6e6;

    }
`
export const Bynem = styled.div`
    cursor: pointer;
    width: 100px;
    span{
        transition: 0.8s;
        font-size: 1rem;
        color: #46a6e6;
        font-weight: bold;
        &:hover {
            color: #E414B2;
        }
    }
`

export const ContainerRedeSociais = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    transition: 1s;
    svg{
        transition: 0.8s;
        color: #46a6e6;
        &:hover {
            color: #E414B2;
        }
    }
`


export const Title = styled.a`
    margin: 0;
    font-weight: bold;
    color: #E414B2;
    cursor: pointer;
    text-decoration: none;
    font-size: 1rem;
        transition: 0.8s;
    &:hover {
    color: #46a6e6;

    }
    
`
export const SubTitle = styled.span`
    
`
