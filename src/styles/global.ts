import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }
  
  body {
    font-family: 'Roboto', sans-serif;
    height: 535px;
   
    #__next {
      height: 535px;
    }   
  }
  ::-webkit-scrollbar{
    width: 7px;
    height: 7px;
    margin-right: 3px;
  }
  ::-webkit-scrollbar-track{


  }
  ::-webkit-scrollbar-thumb{
    max-width: 7px;
    background: #7B848E;
    border-radius: 24px;
      &:hover{
      background-color: rgba(0, 0, 0, 0.1);

      }
  }

`
export default GlobalStyles
