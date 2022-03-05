import styled from 'styled-components'

export const Container = styled.main``

export const Content = styled.main`
    display: flex !important;
    flex-direction: column !important;
    user-select: none;
    background-color: white !important;
    min-height: 855px;
    margin: 48px;
    padding: 18px;
    min-height: calc(100vh - 198px);

    @media(max-width: 800px) {
        margin: 8px;
        padding: 8px;
    }
`

export const Title = styled.p`
    font-size: 2.5rem;
    margin: 0 0 0 2rem;
    color: #46a6e6;
`

export const SubTitle = styled.p`
    margin: 0 0 0 2rem; 
    color: black;
`

export const ContainerVideoOrImage = styled.div`
      margin: 2rem;

    display: flex;
    justify-content: center;

    > iframe {
      width: 600px;
    }
    img{ 
      width: 600px;

    }
`

export const ContainerDescription = styled.div`
    margin: 0 2rem 0 2rem;
    border: none;
`

export const ContainerButton = styled.div`
    margin: 2rem 2rem 0 2rem;


`


export const ContainerTableQuestions = styled.div`
    margin: 2rem 2rem 0 2rem;

`
export const ConsultancyVideo = styled.div`
  
`