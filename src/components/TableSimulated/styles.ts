import styled from "styled-components";

export const Tools = styled.div`
    width: 100%;
    margin-top: 5vh;
    margin-bottom: 3vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const divButton = styled.div`
    margin: 0 0 0 2rem;
`

export const Button = styled.button`
    border: none;
    background-color: #70e000;
    border-radius: 6px;
    padding: 0.5rem 2rem;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
    white-space: nowrap;
    &:hover {
        opacity: 0.7;
    }
   
`
export const SearchContainer = styled.form`
    display: flex;
    margin: 0 2rem 0 auto;
    
    svg{
        width: 30px;
    }
     @media (max-width: 500px){
        margin: 0 2rem 0 auto ;
    }
`

export const DivTable = styled.div`
        height: 610px;
        margin: 0 2rem 0 2rem;
    .ant-btn{
        margin: 2px;
        border-radius: 4px;
    }
`