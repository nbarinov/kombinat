import DataComponent from '../HOC/DataComponent';
import Table from './Table';

const MenuViewUI = ({ data }) => {
    return <section>
        <h2>Меню на </h2>
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