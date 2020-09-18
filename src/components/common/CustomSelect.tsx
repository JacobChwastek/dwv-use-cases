import React from "react";
import { Select, Button, Modal } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons"
import styled from "styled-components";

const { Option } = Select;

type Option = {
    value: any;
    label: string;
};

type InfoProps = {
    title?: string;
    infoContent?: JSX.Element | JSX.Element[];
}

export type Props = {
    options: Array<Option>;
    selectedOption?: any;
    onChange: (value: any) => void;
    disabled?: boolean;
    placeholder?: string;
} & InfoProps;

const CustomSelect = (props: Props) => {
    
    const info = () => {
        Modal.info({
            title: props?.title,
            content: props?.infoContent,
            onOk() { },
        });
    }

    return (
        <Wrapper>
            <CSelect value={props?.selectedOption} onChange={e => props.onChange(e)} disabled={props?.disabled} placeholder={props?.placeholder}>
                {props.options &&
                    props.options.map(option => (
                        <Option key={option.value} value={option.value}>
                            {option.label}
                        </Option>
                    ))}
            </CSelect>
            <Button icon={<InfoCircleOutlined />} onClick={info}/>
        </Wrapper>
    );

};



const CSelect = styled(Select)`
    width: 100%;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
`

export default CustomSelect;
