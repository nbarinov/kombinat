import DataComponent from '../HOC/DataComponent';
import Table from './Table';
import { getGenitiveMonth } from '../../libs/date-helper';

const MenuViewUI = ({ data }) => {
    const date = new Date(data[0].date);

    return <section>
        <h2>Меню на {date.getDate()} {getGenitiveMonth(date.getMonth())} {date.getFullYear()}</h2>
        {data.map((menu, index) => {
            const Dish = DataComponent(Table, `/api/dishes/list/${menu.menuId}`);
            return <section>
                <h3>{menu.menuType}</h3>
                <Dish key={index} />
            </section>;
        })}
    </section>;
};

export default MenuViewUI;