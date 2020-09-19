import React, { useState } from 'react';
import { Point, Circle } from "../utils/Models";
import { Input, Select, Col, Row, Button } from 'antd';
import { NumericInput } from "./common"
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
    radius: any;
    pixelSpacing: number;
}

const PointCenterMenu = (props: Props) => {
 
    const [selectState, setSelectState] = useState<Option>("px");

    const onInputChange = (input : string) => {
        
        const r = parseFloat(input); 

        if(selectState === "cm")
        {
            const radius = cmToPixel(r,props.pixelSpacing);
            props.handleRadiusChange(radius);
        }
        else{
            props.handleRadiusChange(r || 0);
        }
    }

    const onOptionChange = (e : Option) => {
        props.handleRadiusChange(0);
        setSelectState(e);
    }

    const displayRadius = (value : number) => {

        if(selectState === "cm"){
            return pixelToCm(value, props.pixelSpacing);
        }

        return value;
    }

    return (
        <div>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <InputWrapper compact>
                        <NumericInput 
                            disabled={props.points.length === 1}
                            defaultValue={0}
                            // style={{ width: '50%' }} 
                            value={displayRadius(props.radius)} 
                            onChange={e => onInputChange(e)}   
                        />
                        
                        <CSelect defaultValue="px" value={selectState} onChange={e => onOptionChange(e)}>
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