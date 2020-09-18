import React, { useState } from 'react'
import { Button, Row, Col } from "antd";
import { } from "styled-components";
import { Point, Circle } from "../utils/Models";
import styled from "styled-components"

type Props = {
    handlePointsButton: (state: boolean) => void;
    handleReset: (state: boolean) => void;
    points: Point[];
    circle: Circle
}

const ThreePointsMenu = (props: Props) => {

    return (
        <Menu>
            <Row gutter={[16, 16]}>
                <Col span={12} >
                    {
                        props.points.length === 3 ? 
                        <Button onClick={() => props.handleReset(true)}>Resetuj</Button>
                        :
                        <Button onClick={() => props.handlePointsButton(true)}> Wyznacz punkty</Button>
                    }
                </Col>
                <Col span={12}>{props.points.length} / 3</Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={12} />
                <Col span={12} />
            </Row>
        </Menu>
    )
}

const Menu = styled.div`

`

export default ThreePointsMenu;