import React, { Component } from "react"
import { Input, Tooltip } from 'antd';
import _ from "lodash"

type State = {

}

type Props = {
    value: any;
    onChange: (value: any) => void;
    onBlur?: () => void;
    tooltip?: boolean;
    tooltipText?: string;
    placeholder?: string;
    disabled?: boolean;
    defaultValue?: number;
}


class NumericInput extends Component<Props, State> {

    render() {
        const { value } = this.props;

        const title = value ? (
            <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
        ) : (
                this.props?.tooltipText
            );

        return (
            <Tooltip
                trigger={['focus']}
                title={title}
                visible={this.props?.tooltip}
                placement="topLeft"
                overlayClassName="numeric-input"
            >
                <Input
                    defaultValue={this.props?.defaultValue}
                    disabled={this.props?.disabled}
                    onChange={this.onChange}
                    onBlur={this.onBlur}
                    value={`${this.props.value}`}
                    placeholder={this.props?.placeholder}
                    maxLength={25}
                />
            </Tooltip>
        );
    }

    onChange = (e: any) => {
        const { value } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.onChange(value);
        }
    };

    onBlur = () => {
        const { value, onBlur, onChange } = this.props;

        if (_.isString(value)) {
            let valueTemp = value;
            if (value.charAt(value.length - 1) === '.' || value === '-') {
                valueTemp = value.slice(0, -1);
            }
            onChange(valueTemp.replace(/0*(\d+)/, '$1'));
            if (onBlur) {
                onBlur();
            }
        }

    };
}

function formatNumber(value: string) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}


export default NumericInput;