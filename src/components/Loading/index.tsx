import * as S from './styles'
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function Loading() {
    const antIcon = <LoadingOutlined style={{ fontSize: 34, color: "#E414B2" }} spin />
    return (
        <S.LoaderContainer>
            <Spin indicator={antIcon} delay={0} />
        </S.LoaderContainer>
    )
}

export default Loading