
import { useState } from 'react';
import React from 'react';
import moment from 'moment';

// Components
import { useTable, useExpanded } from 'react-table';
import { Row, Col, Typography, Space, Dropdown, Badge, Menu, Form, Table, InputNumber, Input, Popconfirm, Collapse } from "antd";
import { DownOutlined } from "@ant-design/icons";
import WriteNote from '../WriteNote/WriteNote';
import './styles.css';






const TableRenderBillOpen = ({ listBills = {} }) => {
    const [selectRow, setSelectRow] = useState('');
    const [editingBilll, setEditingBill] = useState({});
    const { Panel } = Collapse;

    const onClickToEdit = (current) => {
        setEditingBill(current);
        setSelectRow(current.id);
    };

    return (
        <Row>
            <Col span={24} style={{ padding: '0px 20px 0px 20px' }} >
                <Typography.Title level={4} >TableRenderBillOpen</Typography.Title>

                <Collapse >
                    {Object.keys(listBills).map((item, index) => (
                        <Panel header={item} key={index} >
                            {listBills[item].map((item2, index) => {
                                const { description, timeStart } = item2;
                                const timeBigin = moment(timeStart, 'HH:mm').format('HH:mm a');
                                // console.log(item2)
                                const dx = Object.values(description).join(', ');
                                return (
                                    <Col span={24}>
                                        <Row key={index} justify='start' className={`hover row ${selectRow === item2.id ? 'selectedRow' : ''}`} onClick={(e) => onClickToEdit(item2)}>
                                            <Col span={6} >
                                                <Typography.Title level={5} >{item2.cn}</Typography.Title>
                                            </Col>
                                            <Col span={10} >
                                                <Typography.Title level={5} >{dx}</Typography.Title>
                                            </Col>
                                            <Col span={2} >
                                                <Typography.Title level={5} >{timeBigin}</Typography.Title>
                                            </Col>
                                            <Col span={2}  >
                                                <Typography.Title level={5} >{item2.min}</Typography.Title>
                                            </Col>
                                            <Col span={2} >
                                                <Typography.Title level={5} >{item2.units}</Typography.Title>
                                            </Col>
                                        </Row>
                                    </Col>
                                )
                            })}
                        </Panel>
                    ))
                    }
                </Collapse>
            </Col>
            {selectRow && <WriteNote noteEdit={editingBilll} />}
        </Row >
    )
}


export default TableRenderBillOpen;