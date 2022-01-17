import { Steps, Divider } from 'antd';
import { useState } from 'react';

const { Step } = Steps;

export default function StepComponent() {
    const [current, setCurrent] = useState(0)

    function stepChange(e) {
        setCurrent(e)
    }
    return (
        <>
            <Steps size="small" status='process' className="KKKKKKKKK" current={current} onChange={e => stepChange(e)} direction="vertical">
                <Step title="1" />
                <Step title="2" />
                <Step title="3" />
                <Step title="4" />
                <Step title="5" />
                <Step title="6" />
                <Step title="7" />
            </Steps>
        </>
    );
}
