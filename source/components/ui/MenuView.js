import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';
import TableVertical from './TableVertical';

import '../../style/view-container.css';

const MenuView = ({ data }) => {
    console.log(data[0]);
    const { menuId, ...menu} = data[0];
    console.log(menuId, menu);

    let DishesTable = null;

    if (menu) {
        DishesTable = DataComponent(Table, `/api/dishes/list/${menuId}`);
    }

    return (
        <section className="view-container view-container__section--pr0">
            {(menu) ? (
                <div className="view-container__wrapper">
                    <section className="view-container__section view-container__section--pr0">
                        <h2 className="view-container__title">Информация о меню</h2>
                        <TableVertical data={menu} className="view-container__info" />
                    </section>
                    <section className="view-container__section">
                        <h2 className="view-container__title">Блюда</h2>
                        <DishesTable className="view-container__parent" />
                    </section>
                </div>
            ) :
                'Меню не найден'}
        </section>
    );
};

MenuView.propTypes = {
    data: PropTypes.object,
};

export default MenuView;