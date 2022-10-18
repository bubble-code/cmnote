
import { Link } from 'react-router-dom';
import { routes } from "../routes"

export const ListRoutes = () => {
    return (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            {routes.map((route, index) => (
                <li key={index} className="my-2">
                    <Link to={route.path} className="text-blue-500 hover:text-blue-700" >
                        <h5 className="text-sm font-medium">{route.name}</h5>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default ListRoutes