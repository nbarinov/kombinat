import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import '../../style/main-menu.css';

const MainMenu = ({ className, user, onLogOut, location }) => 
    <nav className={(className ? `${className} main-menu` : 'main-menu')}>
        <ul className="main-menu__list">
            <li className="main-menu__item">{(location.pathname === '/profile' && user) ?
                <button type="button" onClick={onLogOut}>Выйти</button> :
                <NavLink to="/profile">Личный кабинет</NavLink>}</li>
        </ul>
    </nav>
;

MainMenu.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object,
    onLogOut: PropTypes.func,
};

export default MainMenu;