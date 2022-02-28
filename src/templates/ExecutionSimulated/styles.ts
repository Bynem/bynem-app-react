import styled from 'styled-components'

export const Container = styled.main``

export const Content = styled.main`
    display: flex !important;
    flex-direction: column !important;
    user-select: none;
    background-color: white !important;
    min-height: 855px;
    margin-bottom: 50px;
    margin: 48px;
    padding: 18px;
    border-radius: 8px;
    min-height: calc(100vh - 198px);

    @media(max-width: 800px) {
        margin: 8px;
        padding: 8px;
    }
`
export const ContainerCount = styled.div`
    margin: 0 2rem 0 2rem; 
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const ContainerCountQuestions = styled.div`
    p{
        margin: 0;
    }
`

export const ContainerCountTimer = styled.div`
`


export const Title = styled.div`
    font-size: 2.5rem;
    margin: 0 0 0 2rem;
    color: #46a6e6;
    word-wrap: break-word;
    font-weight: bold;
`

export const SubTitle = styled.p`
    margin: 0 0 0 2rem; 
    color: black;
`

export const ContainerVideoOrImage = styled.main`
    margin: 2rem;
    display: flex;
    @media (max-width: 768px) {
            margin: 0

    }
   
   
`

export const StepContainer = styled.div`
    position: relative;
    width: 6rem;
    right: 0;
    
    .ant-steps {
        margin-left: auto !important;
        margin-right: auto !important;
        width: fit-content;
        margin: 0;
    }

    @media (max-width: 768px) {
        display: none;
    }

`

export const ContainerTableQuestions = styled.div`
    margin: 2rem 2rem 0 2rem;

`
export const ConsultancyVideo = styled.div`
  
`

export const ContainerIframe = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
     img{
         height: 400px;
         width: 600px;
        @media (max-width: 600px) {
            width: 100%;
            }
    }
`

export const ContainerSubTitle = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
    margin: 2rem;
    color: #46a6e6;
    word-wrap: break-word;
    text-align: center;
    p{

    }
`
export const ContainerOptions = styled.div`
    background-color: #f5f5f5;
    width: 100%;
    max-width: 580px;
    margin: 0 auto 0 auto;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    
    h4 {
        font-weight: bold;
        margin-bottom: 18px;
    }
    .ant-radio-wrapper.ant-radio-wrapper-disabled {
        span {
            color: black !important;
        }
    }
    form {
        padding: 2rem;
    }
    @media (max-width: 600px) {
        width: 100%;

    }
    .ant-checkbox-group {
        flex-direction: column;
        width: 100%;
        /* .ant-col.ant-col-12 {
            flex: 1;
            max-width: 100%;
        } */
    }
`
export const CheckContainer = styled.div`
    .ant-col-8, .ant-col-12 {
        flex: 1;
        max-width: 100%;
    }
    .ant-row {
        margin-bottom: 10px;
    }
`

export const DivCheckBox = styled.div`
    display: flex;
    align-items: center;
    margin: 1rem 0 0 0;


    >input{
        width: 16px;
        height: 16px;
    }
`

export const ContainerDescription = styled.div`
    margin: 1rem 1rem 0 1rem;
    border: none;
    width: 100%;
    word-wrap: break-word;

    p{
        margin: 0
    }
`
export const ContainerButton = styled.div`
    display: flex;
    padding-top: 2rem;
    justify-content: space-between;
    margin-right: auto;
    align-items: center;
    border-top: 1px solid #ab9b9b;
     .ant-btn{
        margin: 2px;
        border-radius: 4px;
    }
    .labelYoutube{
        padding: 0 21px 0 22px;
    }
`