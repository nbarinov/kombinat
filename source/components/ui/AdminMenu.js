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
            <li className="menu__item"><NavLink to="/admin/persons/list" activeStyle={selectedStyle}>Дети</NavLink></li>
            <li className="menu__item"><NavLink to="/admin/schools/list" activeStyle={selectedStyle}>Школы</NavLink></li>
            <li className="menu__item"><NavLink to="/admin/menus/list" activeStyle={selectedStyle}>Меню</NavLink></li>
            <li className="menu__item"><NavLink to="/admin/dishes/list" activeStyle={selectedStyle}>Блюда</NavLink></li>
            <li className="menu__item"><NavLink to="/admin/contracts/list" activeStyle={selectedStyle}>Договора</NavLink></li>
        </ul>
    </nav>;

AdminMenu.propTypes = {
    className: PropType.string,
};

export default AdminMenu;