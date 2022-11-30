
import { useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import linksMenu from './linksMenu';

export const NavBarVertical = () => {
    const navigate = useNavigate();

    const items = linksMenu.map((item) => {
        return {
            key: item.key,
            label: `${item.label}`
        };
    });

    const onClickNav = (e) => {
        const itemIndex = linksMenu.findIndex((item) => item.key === e.key);
        navigate(linksMenu[itemIndex].url);
    }

    return (
        <Layout.Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['dashboard']}
                style={{
                    height: '100%',
                    borderRight: 0,
                }}
                items={items}
                onClick={onClickNav}
            />
        </Layout.Sider>
    )
}

export default NavBarVertical