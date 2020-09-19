import React, { useState } from 'react';
import { Point, Circle } from "../utils/Models";
import { Input, Select, Col, Row, Button } from 'antd';
import { cmToPixel, pixelToCm } from "../utils/math";
import styled from "styled-components";
import _ from "lodash";

const { Option } = Select;

type Option = "px" | "cm" | any;

type Props = {
    handlePointsButton: (state: boolean) => void;
    handleReset: (state: boolean) => void;
    handleRadiusChange: (value: number) => void;
    points: Point[];
    circle: Circle;
    pixelSpacing: string;
    radius: any;
}

const PointCenterMenu = (props: Props) => {

    const onInputChange = (input : any) => {
        
        let r = parseFloat(input);
        
        if(_.isNumber(r) && r > 0){
            props.handleRadiusChange(r);
            return;
        }

        props.handleRadiusChange(0);
    }

    const onOptionChange = (e : Option) => {
        const { radius } = props;
        let r = 0;

        if(e === "px"){
            r = cmToPixel(radius,props.pixelSpacing);
        }
        else if( e == "cm"){
            r = pixelToCm(radius,props.pixelSpacing);
        }
        props.handleRadiusChange(r);
    }


    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <InputWrapper compact>
                        <CInput 
                            style={{ width: '50%' }} 
                            defaultValue="0" 
                            value={props.radius} 
                            onChange={e => onInputChange(e.target.value)}
                        />
                        
                        <CSelect defaultValue="cm"  onChange={e => onOptionChange(e)}>
                            <Option value="cm">cm</Option>
                            <Option value="px">px</Option>
                        </CSelect>
                    </InputWrapper>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={12} >
                    {
                        props.points.length === 1 ?
                            <CButton onClick={() => props.handleReset(true)}>Resetuj</CButton>
                            :
                            <CButton onClick={() => props.handlePointsButton(true)}> Wyznacz środek</CButton>
                    }
                </Col>
                <Col span={12}>{props.points.length} / 1</Col>
            </Row>
        </div>
    )
}

const InputWrapper = styled(Input.Group)`
    display: flex !important;
    flex-direction: row;
`
const CSelect = styled(Select)`
    width: 60%;
`
const CInput = styled(Input)`
    width: 100% !important;
`
const CButton = styled(Button)`
    width: 100%;
`

export default PointCenterMenu;