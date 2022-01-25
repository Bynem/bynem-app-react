import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';


export default function Input2({ form, setForm, index, deletarUltimo }: any) {
    useEffect(() => {
        if (form) {
            const nome11 = 'resposta'.concat(index + 1)
            setForm({
                ...form,
                [nome11]: {
                    ...form[nome11],
                    descricao: "",
                    certa: false
                }
            })
        }
    }, [deletarUltimo])

    function setQuestion(e) {
        if (e.target.checked === false || e.target.checked) {
            const nome11 = 'resposta'.concat(index)
            let { checked } = e.target
            setForm({
                ...form,
                [nome11]: {
                    ...form[nome11],
                    certa: checked
                }
            })
            return
        }
        const nome11 = 'resposta'.concat(index)
        let { value } = e.target
        setForm({
            ...form,
            [nome11]: {
                ...form[nome11],
                descricao: value
            }
        })
    }

    return <CheckContainer>
        <DivCheckBox>
            <input
                type="checkbox"
                name={`question${index}`}
                className="form-check-input"
                onChange={e => setQuestion(e)}
            />
        </DivCheckBox>
        <Form.Item name={`question${index}`} className="question">
            <Input.TextArea onChange={e => setQuestion(e)} rows={2} showCount maxLength={500} />
        </Form.Item >
    </CheckContainer>
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

