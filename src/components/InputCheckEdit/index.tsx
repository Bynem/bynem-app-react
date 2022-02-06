import React from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { DeleteOutlined } from '@mui/icons-material';


export default function Input2Edit({ arreiDeRespostas, setArreiDeRespostas, index, current }: any) {
    function setQuestionChecked(e) {
        if (e.target.checked === false || e.target.checked) {
            let { checked } = e.target
            let newArr = [...arreiDeRespostas]; // copying the old datas array
            newArr[index] = { ...newArr[index], correta: checked }
            setArreiDeRespostas(newArr)
            return
        }
    }

    function setQuestion(e) {
        const { value } = e.target
        let newArr = [...arreiDeRespostas]; // copying the old datas array
        newArr[index] = { ...newArr[index], descricao: value }
        setArreiDeRespostas(newArr)
        return
    }
    function deleteThis(index) {
        console.log("opa", arreiDeRespostas.filter((item, indexI) => indexI !== index))
        setArreiDeRespostas(arreiDeRespostas.filter((item, indexI) => indexI !== index))
        // console.log(index)
        // let temporario = arreiDeRespostas
        // temporario.splice(index, 1)
        // console.log(temporario)
        // setArreiDeRespostas(temporario)
    }
    return (<>
        <CheckContainer>

            <DivCheckBox>
                <input
                    type="checkbox"
                    name={`question${index}`}
                    className="form-check-input"
                    checked={current.correta ? current.correta : false}
                    onChange={e => setQuestionChecked(e)}
                />
            </DivCheckBox>
            <Form.Item name={`question${index}`} className="question">
                <Input.TextArea onChange={e => setQuestion(e)} defaultValue={current.descricao ? current.descricao : ""} rows={2} showCount maxLength={500} />
                <DivLixeira onClick={() => deleteThis(index)}>
                    <Lixeira />
                </DivLixeira>
            </Form.Item >
        </CheckContainer>
    </>
    )
}


export const DivCheckBox = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    margin-right: 8px;
    .form-check-input{
        color: red;
    }
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
export const Lixeira = styled(DeleteOutlined)`
    color: red;
    cursor: pointer;
    &:hover{
        color: #1890ff;
        
    }
`
export const DivLixeira = styled.div`
    position: absolute;   
    right: -35px; 
    top: 13px;
    
    svg{
        width: 30px;
        height: 30px;
    }
`
