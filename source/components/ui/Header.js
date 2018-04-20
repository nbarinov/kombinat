import { title } from '../../config';
import MainMenu from './MainMenu';

const Header = () => 
    <header>
        <h1>{title}</h1>
        <MainMenu />
    </header>
;

export default Header;