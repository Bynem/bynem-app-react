import styled from "styled-components";


export const Container = styled.div`
    height: 100vh;
    width: 100vw;
    background: linear-gradient(45deg, rgba(40,130,214,1) 0%, rgba(228,20,178,1) 51%, rgba(228,20,178,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Content = styled.div`
    display: flex;
    flex-direction: row;
    border-radius: 40px;
    /* box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px; */
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    /* box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px; */
`

export const ConteinerLeft = styled.div`
    height: 750px;
    width: 480px;
    background-color: rgba(255,255,255);
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; 
    @media(max-width: 1300px) {
        width: 380px;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
   }
   @media(max-width: 600px) {
        height: 450px;
        width: 320px;
        border-top-right-radius: 40px;
        border-bottom-right-radius: 40px;
   }
`

export const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;    
    align-items: center;
    justify-content: center;
   
`
export const ContainerImage = styled.div`
    background: #f1f4;
    width: fit-content;
    margin-left: auto;
    margin-right: auto;
    img{
        width: 200px;
    }
`
export const ConteinerRight = styled.div`
    height: 750px;
    width: 800px;
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    padding: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    text-align: center;
    @media(max-width: 1300px) {
        display: none;
    }
`

export const ContainerText = styled.div`
    margin-left: auto;
    margin-right: auto;
    display: flex;
    flex-direction: column;
    align-items: start;
`

export const Title = styled.div`
    margin: 0px;
    font-family: "Inter var", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 3rem ;
    line-height: 1.167;
    color: rgba(255, 255, 255);
    

`

export const SubTitle = styled.div`
    margin-top: 20px;
    font-family: "Inter var", Roboto, Helvetica, Arial, sans-serif;
    font-weight: 700;
    font-size: 1.3rem;
    color: white;
`