import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import '../../style/menu.css';

const MainMenu = ({ className, user, onLogOut, location }) => 
    <nav className={(className ? `${className} menu` : 'menu')}>
        <ul className="menu__list">
            {(location.pathname === '/profile' && user) ?
                <li className="menu__item  menu__item--light">{`${user.firstName} ${user.middleName} ${user.lastName}`}</li> :
                ''}
            <li className="menu__item">{(location.pathname === '/profile' && user) ?
                <button className="menu__button" type="button" onClick={onLogOut}>Выйти</button> :
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