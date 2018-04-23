import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';
import TableVertical from './TableVertical';

import '../../style/view-container.css';

const PersonView = ({ data }) => {
    const {pId: parentId, ...person} = data[0];
    let PaymentTable = null;
    let RateTable = null;
    let ParentTable = null;

    if(person) {
        ParentTable = DataComponent(TableVertical, `/api/parent/find/${parentId}`);
        PaymentTable = DataComponent(Table, `/api/person/payment/${person.account}`);
        RateTable = DataComponent(Table, `/api/person/rate/${person.account}`);
    }

    return (
        <section className="view-container">
            {(person) ? (
                <div className="view-container__wrapper">
                    <section className="view-container__section view-container__section--pr0">
                        <h2 className="view-container__title">Информация о ребенке л/с {person.account}</h2>
                        <TableVertical data={person} className="view-container__info view-container__info--pr3" />
                    </section>
                    <section className="view-container__section">
                        <h2 className="view-container__title">Законный представитель</h2>
                        <ParentTable className="view-container__payment" />
                    </section>
                    <section className="view-container__section">
                        <h2 className="view-container__title">Платежи</h2>
                        <PaymentTable className="view-container__payment" />
                    </section>
                    <section className="view-container__section">
                        <h2 className="view-container__title">Расходы</h2>
                        <RateTable className="view-container__rate" />
                    </section>
                </div>
            ) :
                'Пользователь не найден'}
        </section>
    );
};

PersonView.propTypes = {
    data: PropTypes.object,
};

export default PersonView;