import React from 'react';
import { Table } from 'antd';

class TagsTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            data: this.props.data,
        };
    }

    columns = [
        {
            title: 'Tag',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value'
        },
    ];

    render() {
        const { data } = this.state;
        
        return (            
            <Table dataSource={data} columns={this.columns} />
        );
    }
}

export default TagsTable;
