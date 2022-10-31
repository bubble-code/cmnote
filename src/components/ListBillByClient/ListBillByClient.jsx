import { useState } from 'react'
import { useSliceBillingByCmSelector } from '../../Redux/sliceProvider';
import moment from 'moment';

// Componets
import { Col, Row, Select, Button, Form, Typography, Tag } from 'antd';
import './styles.css'
import WriteNote from '../WriteNote/WriteNote';


const { Option } = Select

export const ListBillByClient = () => {
    const [stateSelectedClient, setStateSelectedClient] = useState({ client: '' })
    const { data: listBillingByCm } = useSliceBillingByCmSelector();
    const { clienWithBill = [], data: listBills = [] } = listBillingByCm;
    const [editingBill, setEditingBill] = useState({});

    const handleChangeClient = (value) => {
        // console.log("Cline", value)
        setStateSelectedClient({ client: value })
    }

    const onClickToEdit = (current) => {
        setEditingBill(current);
    };

    const selectCard = (item) => {
        return editingBill.id === item.id ? 'select_card' : '';
    };

    const filterBillsByClient = (client) => {
        if (client === '') return [];
        const keys = Object.keys(listBills);
        let result = [];
        keys.forEach(key => {
            result.push(...listBills[key].filter((item) => item.cn === client));
        });
        console.log("Result", [...result])
        return [...result];
    }
    return (
        <Col span={24} style={{ minHeight: '90vh' }} >
            <Row justify='start' style={{ marginTop: '10px', paddingTop: '10px' }}>
                <Col span={6}>
                    <Form.Item >
                        <Select placeholder='Client Name' allowClear onChange={handleChangeClient} >
                            {clienWithBill && clienWithBill.map((item, index) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={4}>
                    <Form.Item >
                        <Button type='primary' >History</Button>
                    </Form.Item>
                </Col>
            </Row>
            <Row justify='start' align='top'>
                {filterBillsByClient(stateSelectedClient.client).map((item, index) => (
                    <Col span={4} key={index} className={`desc_list car_bill ${selectCard(item)}`} style={{ margin: '5px' }} onClick={() => onClickToEdit(item)}>
                        <Col className='list_desc'>
                            <Typography.Text style={{ color: '#1890ff', fontSize: '0.6rem' }}>{moment(item.fecha, 'DD-MM-YYYY').format('dd DD/MM/YYYY')}</Typography.Text>
                            <ol>
                                {
                                    Object.values(item.description).map(desc => (
                                        <li>
                                            <Typography.Text style={{ fontSize: '0.55rem', fontWeight: 600, color: 'violet' }} >{desc}</Typography.Text>
                                        </li>
                                    ))
                                }
                            </ol>
                        </Col>
                    </Col>
                ))
                }
            </Row >
            <WriteNote noteEdit={editingBill} />
        </Col >
    )
}

export default ListBillByClient;