import PropTypes from 'prop-types';
import DataComponent from '../HOC/DataComponent';
import Table from './Table';
import TableVertical from './TableVertical';

import '../../style/view-container.css';

const SchoolView = ({ data }) => {
    const { tin, ...school } = data[0];
    let LeaseTable = null;

    if (school) {
        LeaseTable = DataComponent(Table, `/api/lease/view/${tin}`);
    }

    return (
        <section className="view-container">
            {(school) ? (
                <div className="view-container__wrapper">
                    <section className="view-container__section">
                        <h2 className="view-container__title">Информация о школе</h2>
                        <TableVertical data={school} className="view-container__info" />
                    </section>
                    <section className="view-container__section">
                        <h2 className="view-container__title">Договор аренды</h2>
                        <LeaseTable className="view-container__lease" />
                    </section>
                </div>
            ) :
                'Меню не найден'}
        </section>
    );
};

SchoolView.propTypes = {
    data: PropTypes.object,
};

export default SchoolView;