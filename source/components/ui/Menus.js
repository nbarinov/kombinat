import DataComponent from '../HOC/DataComponent';
import MenuView from './MenuViewUI';

const Menus = ({ match }) => {
    const Menu = DataComponent(MenuView, `/api/menus/${match.params.tin}/${match.params.date}`);
    
    return <Menu />;
};

export default Menus;