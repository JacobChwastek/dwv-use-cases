import React from 'react'
import { Row, Col } from "antd";
// import styled from "styled-components";

type Props = {
    content: JSX.Element[] | JSX.Element | string | null
}

const Layout = (props: Props) => {
    return (
        <Row gutter={[16, 16]}>
            <Col span={8}>

            </Col>
            <Col span={8}>
                {props.content}
            </Col>
            <Col span={8}>

            </Col>
        </Row>
    )
}
export default Layout;