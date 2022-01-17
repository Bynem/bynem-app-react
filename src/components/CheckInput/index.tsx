import React, { useState } from 'react'
import { Form, Input, Radio } from 'antd';
import * as S from './styles'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

export type CheckInput = {
    question: number
    checked: boolean
}



function CheckInput({ question, checked, }: CheckInput) {
    const [hourSelected, setHourSelected] = useState<number>(0)
    const [selectedTime, setSelectedTime] = useState(false)
    const [checkedInput, setCheckedInput] = useState(false)

    const handleChange = (e) => {
        const { value } = e.target;

        setSelectedTime(true)
        setHourSelected(value)
    };
    const setCheckedRadio = (e) => {
        if (e.target.checked) {
            setCheckedInput(false)
        }
    }

    if (checked) {
        return <S.CheckContainer>
            <S.DivCheckBox>
                <input
                    type="radio"
                    className="form-check-input"
                    id={"1"}
                    checked={checkedInput}
                    name={`question${question}`}
                    value={'diferente'}
                    onClick={e => setCheckedRadio}
                />

            </S.DivCheckBox>
            <Form.Item name={`question${question}`} key={question} className="question">
                <Input.TextArea rows={2} showCount maxLength={500} />
            </Form.Item >
        </S.CheckContainer>
    }

    // if (checked) {
    //     return <S.ContainerQuestions key={question}>
    //         <Radio.Group>
    //             <Radio value={`${question}`} />
    //         </Radio.Group>
    //         <Form.Item name={`checked`} wrapperCol={{ span: 2 }}>
    //         </Form.Item>
    //         <Form.Item name={`question${question}`} key={question} className="question">
    //             <Input.TextArea rows={2} showCount maxLength={500} />
    //         </Form.Item >
    //     </S.ContainerQuestions>
    // }

    return <S.ContainerQuestions key={question}>
        <Form.Item name={`checked`} wrapperCol={{ span: 2 }}>
            <Radio.Group>
                <Radio value={`${question}`} />
            </Radio.Group>
        </Form.Item>
        <Form.Item name={`question${question}`} key={question} className="question">
            <Input.TextArea rows={2} showCount maxLength={500} />
        </Form.Item >
    </S.ContainerQuestions>

}


export default CheckInput