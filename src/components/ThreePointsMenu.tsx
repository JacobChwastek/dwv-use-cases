import React, { useState } from 'react'
import { Button, Row, Col, Statistic } from "antd";
import { } from "styled-components";
import { Point, Circle } from "../utils/Models";
import styled from "styled-components"
import { pixelToCm } from "../utils/math"

type Props = {
    handlePointsButton: (state: boolean) => void;
    handleReset: (state: boolean) => void;
    points: Point[];
    circle: Circle;
    pixelSpacing: string;
}

const ThreePointsMenu = (props: Props) => {

    const { circle: { center, r } } = props;
    return (
        <Menu>
            <Row gutter={[16, 16]}>
                <Col span={12} >
                    {
                        props.points.length === 3 ?
                            <CButton onClick={() => props.handleReset(true)}>Resetuj</CButton>
                            :
                            <CButton onClick={() => props.handlePointsButton(true)}> Wyznacz punkty</CButton>
                    }
                </Col>
                <Col span={12}>{props.points.length} / 3</Col>
            </Row>
            {
                props.points.length === 3 &&
                <>
                    <Row gutter={[16, 16]}>
                        <Col span={24} >
                            <Statistic title="Środek" value={`[ ${center.x.toFixed(3)}, ${center.y.toFixed(3)} ]`} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24} >
                            <Statistic title="Promień" suffix="px" value={r.toFixed(3)} />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24} >
                            <Statistic title="Promień" suffix="cm" value={pixelToCm(r,props.pixelSpacing).toFixed(3)} />
                        </Col>
                    </Row>
                </>
            }

        </Menu>
    )
}

const Menu = styled.div`

`
const CButton = styled(Button)`
    width: 100%;
`

export default ThreePointsMenu;