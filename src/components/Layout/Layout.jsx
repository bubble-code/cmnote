import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { Layout as LayOUT, Col, Row } from 'antd';

const { Header, Footer, Content } = LayOUT;

export const Layout = () => {
    return (
        <Row justify='center'>
            <Col span={20} >
                <Header>
                    <NavBar />
                </Header>
                <Content>
                    <Outlet />
                </Content>
                <Footer />
            </Col>
        </Row>
    )
}

export default Layout