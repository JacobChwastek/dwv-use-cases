import React from "react";
import { Card } from "antd";
import styled from "styled-components";

export type Props = {
    title?: string,
    bordered?: boolean
    children?: JSX.Element | JSX.Element[] | string
    
}

const CustomCard = (props: Props) => {
    return (
        <CCard title={props?.title} bordered={props?.bordered}>
            {props?.children}
        </CCard>
    );
};

const CCard = styled(Card)`
    width: 100%;
    height: 100%;

    .ant-card-head {
        border-bottom: 0px;
    }

    .ant-card-body {
        padding-top: 0px;
    }

    .ant-card-head-title {
        color: #55595d;
    }
`;

export default CustomCard;
