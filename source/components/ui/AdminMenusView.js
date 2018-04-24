import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import MenuView from './MenuView';

const AdminMenusView = ({ match }) => {
    const Menu = DataComponent(MenuView, `/api/menus/view/${match.params.id}`);

    return <Menu />;
};

AdminMenusView.propTypes = {
    match: PropTypes.object.isRequired,
};

export default AdminMenusView;
