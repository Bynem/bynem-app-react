import styled from 'styled-components'
import { FooterProps } from '.'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export const Footer = styled.footer`
    padding-top: 20px;
    background: #F8F9FA;
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
    justify-content: space-between;
    padding:  0 40px 0 40px;
    @media(max-width: 604px){
        flex-direction: column;
        align-items: center;
    padding:  0 0 40px 0;

    }
`

export const ContainerLogo = styled.div`
    height: 40px;
    display: flex;
    cursor: pointer;
    align-items: center;
    flex-direction: row;
    @media(max-width: 320px){
        flex-direction: column;
        align-items: center;
        padding: 0;

    }
    

`

export const ContainerQuemSomos = styled.div`
    text-align: center;
    justify-content: center;
    height: 40px;
    display: flex;
`

export const ContainerContato = styled.div`
    margin-left: 20px;
    height: 40px;
    justify-content: center;
    text-align: center;
    display: flex;

`

export const ContainerPoliticaDePrivacidade = styled.div`
    text-align: center;
    margin-left: 20px;
    justify-content: center;
    height: 40px;
    display: flex;
`
export const ContainerRedeSociais = styled.div`
    width: 300px;
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

export const FacebookIconc = styled(FacebookIcon)`
    margin-left: 20px;
    cursor: pointer;

`
export const InstagramIconc = styled(InstagramIcon)`
    margin-left: 20px;
    cursor: pointer;

`
export const TwitterIconc = styled(TwitterIcon)`
    margin-left: 20px;
    cursor: pointer;

`
export const LinkedInIconc = styled(LinkedInIcon)`
    margin-left: 20px;
    cursor: pointer;

`
