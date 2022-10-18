
import Billing from "../pages/Billing/Billing";
import Signup from "./Signup/Signup";
import Account from "./Home/Home";

export const routes = [
    {
        path: '/billing',
        component: <Billing />,
        exact: true,
        name: 'Billing'
    },
    {
        path: '/signup',
        component: <Signup />,
        exact: true,
        name: 'Signup'
    },
    {
        path: '/account',
        component: <Account />,
        exact: true,
        name: 'Account'
    }
]