import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import '../../style/main-menu.css';

const MainMenu = ({ className }) => 
    <nav className={(className ? `${className} main-menu` : 'main-menu')}>
        <ul className="main-menu__list">
            <li className="main-menu__item"><NavLink to="/profile">Личный кабинет</NavLink></li>
        </ul>
    </nav>
;

MainMenu.propTypes = {
    className: PropTypes.string,
};

export default MainMenu;