import ListRoutes from "./ListRoutes";
import { useNavigate } from 'react-router-dom';
import { UserAuth } from "../../context/AuthContext";
import { authLogout } from "../../context/reduderActions";
import links from "./links";


// Components
import { Menu } from "antd";

const NavBar = () => {

    const navigate = useNavigate();
    const [, dispatch] = UserAuth();
    // const { user } = controller;

    const handlelogout = async () => {
        try {
            await authLogout(dispatch);
            navigate('/');
        } catch (error) {
            console.log(error);

        }
    };

    function onMenuClick({ key }) {
        console.log(links[key].route);
        navigate(links[key].route);
    }

    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['0']}
            onClick={onMenuClick}
            items={links.map((rout, index) => {
                const key = index;
                return {
                    key,
                    label: `${rout.name}`

                };
            })}
        />
    )
}

export default NavBar