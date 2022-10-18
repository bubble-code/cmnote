import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { Layout as LayOUT } from 'antd';

const { Header, Footer, Content } = LayOUT;

export const Layout = () => {
    return (
        <div className='mx-auto max-w-screen-xl py-2 px-4 lg:px-1 lg:py-4' >
            <Header>
                <NavBar />
            </Header>
            <Content>
                <Outlet />
            </Content>
            <Footer />
        </div>
    )
}

export default Layout