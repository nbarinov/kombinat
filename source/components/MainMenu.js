import { NavLink } from 'react-router-dom';

const MainMenu = () => 
    <nav>
        <ul>
            <li><NavLink to="/login">Личный кабинет</NavLink></li>
        </ul>
    </nav>
;

export default MainMenu;