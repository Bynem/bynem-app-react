import { CloseOutlined } from '@mui/icons-material';
import styled from 'styled-components'

export const SubTitle = styled.p`
    font-size: 1.5rem;
    color: #46a6e6;
`
export const Container = styled.div`
.ant-form-horizontal .ant-form-item-label{
    max-width: 270px;
}
`


export const ContainerButton = styled.div`
    width: fit-content;
    margin-right: auto;
     .ant-btn{
        margin: 2px;
        border-radius: 4px;
    }
`

export const Or = styled.div`
    font-size: 1rem;
    margin: 0 8px 0 8px;
    width: fit-content;
    display: inline-block;
    @media (max-width:436px){
        display: flex;
        margin-left: auto;
        margin-right: auto;
    }
`

export const IconClose = styled(CloseOutlined)`
    color: #E414B2;
    margin-top: 4px;
    &:hover{
        color: #46a6e6;
    }

`