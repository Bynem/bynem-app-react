import styled from 'styled-components'

export const ContainerDrop = styled.div`
    margin-left: 2rem;
    
    @media (max-width: 575px){
    margin: 0 2rem 0 2rem;

    }

    .ant-upload.ant-upload-drag:not(.ant-upload-disabled):hover{
        border-color: #E414B2;
    }
    .ant-upload.ant-upload-drag p.ant-upload-drag-icon .anticon{
        /* color: #46a6e6; */
        color: #E414B2;
    }
    .ant-input:hover{
        border-color: #E414B2;
    }
    .ant-input:focus{
        border-color: #E414B2;
        box-shadow: 0 0 0 2px rgb(228 20 178 / 20%);
    
    }
    .question{
        width: 100%;
        /* .ant-form-item-control-input-content{
            display: flex;
            align-items: center;
            .ant-input-textarea{
                width: 100%;
            }
        } */
    }
    .switch-form{
        .ant-form-item-control-input-content{
            display: flex;
            .switch-container{
                margin-left: auto;
            }
        }
    }
`
export const Title = styled.span`
    margin-bottom: 1em;
    font-size: 1.5rem;
    color: #46a6e6;
`

export const ContainerButton = styled.div`

    .ant-btn{
        border: none;

    } 
`
export const SubTitle = styled.p`
    
`





export const ContainerQuestions = styled.div`
    display: flex;
    align-items: center;
`

export const DivCheckBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    margin-right: 8px;

    >input{
        width: 16px;
        height: 16px;
    }
`

export const CheckContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

`