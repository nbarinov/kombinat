import PropTypes from 'prop-types';
import { title } from '../../config';
import { NavLink } from 'react-router-dom';
import MainMenu from './MainMenu';

import '../../style/header.css';

const Header = ({ className }) => 
    <header className={(className ? `${className} header` : 'header')}>
        <h1 className="header__title"><NavLink to="/">{title}</NavLink></h1>
        <MainMenu className="header__menu" />
    </header>
;

Header.propTypes = {
    className: PropTypes.string,
};

export default Header;