
import { useEffect, useState } from 'react';
import { updateService } from '../../Redux/Actions/ActionCMS';

// Components
import { Form, Input, Button, List, Row, Col, Typography } from 'antd';

export const FormEditService = ({ service }) => {
    const [descr, setDescr] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        setDescr(service.description);
        setName(service.label);
    }, [service]);

    const handleChangeDescription = (e, idx) => {
        const newDescr = [...descr];
        newDescr[idx] = e.target.value;
        setDescr(newDescr);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleAddDescription = () => {
        setDescr([...descr, '']);
    };

    const onFinish = () => {
        const data = { service: name, description: descr.filter((item) => item !== '') };
        console.log(data);
        try {
            updateService(data, service.id);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Form layout='vertical' >
            <Form.Item label='Service Name' >
                <Input value={name} onChange={handleNameChange} />
            </Form.Item>
            <Row justify='space-between'>
                <Col span={10}>
                    <Typography.Text strong>Description</Typography.Text>
                </Col>
                <Col>
                    <Button type='dashed' style={{ borderColor: 'blue' }} onClick={handleAddDescription}>Add</Button>
                </Col>
            </Row>
            <List
                dataSource={descr}
                renderItem={(item, idx) => <List.Item>
                    <Input value={item} onChange={(e) => handleChangeDescription(e, idx)} />
                </List.Item>}
            />
            <Form.Item>
                <Button type='primary' onClick={onFinish}>Update</Button>
            </Form.Item>
        </Form>
    )
}

export default FormEditService