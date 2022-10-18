import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { SkypeOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import linksMenu from './linksMenu';

export const NavBarVertical = () => {
    const navigate = useNavigate();

    const items = linksMenu.map((item, index) => {
        // const key = String(index + 1);
        return {
            key: index,
            // icon: React.createElement(icon),
            label: `${item.label}`,
            // children: new Array(4).fill(null).map((_, j) => {
            //     const subKey = index * 4 + j + 1;
            //     return {
            //         key: subKey,
            //         label: `option${subKey}`,
            //     };
            // }),
        };
    });

    const onClickNav = (e) => {
        console.log('click ', e);
        navigate(linksMenu[e.key].url);
    }

    return (
        <Layout.Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['0']}
                // defaultOpenKeys={['sub1']}
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