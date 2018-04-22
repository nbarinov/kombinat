import PropType from 'prop-types';
import { NavLink } from 'react-router-dom';

import '../../style/menu.css';

const selectedStyle = {
    fontWeight: 'bold',
};

const AdminMenu = ({ className }) =>
    <nav className={(className) ? `${className} menu` : 'menu'}>
        <ul className="menu__list  menu__list--start">
            <li className="menu__item"><NavLink to="/admin">Центр управления</NavLink></li>
            <li className="menu__item"><NavLink to="/admin/persons" activeStyle={selectedStyle}>Дети</NavLink></li>
            <li className="menu__item"><NavLink to="/admin/schools" activeStyle={selectedStyle}>Школы</NavLink></li>
        </ul>
    </nav>;

AdminMenu.propTypes = {
    className: PropType.string,
};

export default AdminMenu;