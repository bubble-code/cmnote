import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { Row, Col } from 'antd';
import NavBarVertical from '../../components/NavVertical/NavBarVertical';

export const Billing = () => {
    const [currentLink, setCurrentLink] = useState(1);
    const location = useLocation();
    console.log(location.pathname.split('/')[1]);

    const handleLink = (e) => {
        setCurrentLink(e.target.id);
        // setCurrentLink(link);
    };
    return (
        <Row justify='start' style={{ paddingTop: '2rem' }}>
            <Col span={2}>
                <NavBarVertical />
            </Col>
            <Col span={20}>
                <Outlet />
            </Col>
        </Row>
    )
}

export default Billing