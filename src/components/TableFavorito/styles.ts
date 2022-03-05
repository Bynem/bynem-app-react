import styled from "styled-components";
import {StarOutlined}  from '@mui/icons-material';
import StarBorder from '@mui/icons-material/StarBorder';

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


    .ant-btn{
        background-color: #70e000;
        color: white;
        border-radius: 6px;
    }
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
    margin: 0 2rem 0 0;
    
    svg{
        width: 30px;
    }
     @media (max-width: 500px){
        margin: 0 2rem 0 2rem ;
    }
`

export const DivTable = styled.div`
    height: 591px;
    margin: 0 2rem 0 2rem;
`

export const Star = styled(StarOutlined)`
    color: #E414B2;
    cursor: pointer;
    
`
export const StartFavorito = styled(StarBorder)`
    color: #46a6e6;
    cursor: pointer;
    &:hover {
    transition: 0.8S;
        color: #E414B2;
    }
`

