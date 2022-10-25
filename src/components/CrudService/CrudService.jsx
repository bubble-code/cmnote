import { useState, useEffect } from 'react';
import { getServices, deleteService } from '../../Redux/Actions/ActionCMS';

// Components
import { Row, Col, List, Typography, Button } from 'antd';
import ModalAddService from '../ModalAddService/ModalAddService';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import FormEditService from '../FormEditService/FormEditService';

export const CrudService = () => {
    const [services, setServices] = useState([]);
    const [detail, setDetail] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    async function fetchServices() {
        const response = await getServices();
        setServices(response);
    };
    function handleEdit(item) {
        setDetail(item);
    }
    async function handleDelete(item, index) {
        await deleteService(item.id);
        setServices(services.filter((service, i) => i !== index));
    }



    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <Col span={24} style={{ minHeight: '50vh', padding: '0px 20px 0px 20px' }} >
            <Row justify='space-between' align='top' className='container-form-login' >
                <Col span={10}>
                    <List bordered dataSource={services} header={
                        <Row justify='space-between' align='middle' >
                            <Typography.Title level={4} style={{ color: 'blueviolet' }}>List of Services</Typography.Title>
                            <Button type='primary' onClick={() => { setIsOpen(true) }} >Add Service</Button>
                        </Row>
                    }
                        renderItem={(item, idx) => (
                            <List.Item>
                                <Col span={20}>
                                    <Typography.Text>{item.label}</Typography.Text>
                                </Col>
                                <Col span={1}>
                                    <EditOutlined style={{ color: 'green', cursor: 'pointer' }} onClick={() => { handleEdit(item) }} />
                                </Col>
                                <Col span={1}>
                                    <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleDelete(item, idx)} />
                                </Col>
                            </List.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <FormEditService service={detail} />
                </Col>
            </Row>
            <ModalAddService isOpen={isOpen} handleClose={setIsOpen} updateList={fetchServices} />
        </Col>
    )
}

export default CrudService