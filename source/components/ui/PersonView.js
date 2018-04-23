import PropTypes from 'prop-types';

const PersonView = ({ data }) => {
    const person = data[0];

    return (
        <section>
            {console.log(person)}
            {(person) ?
                <h2>{`${person.firstName} ${person.middleName} ${person.lastName}`}</h2> :
                'Пользователь не найден'}
        </section>
    );
};

PersonView.propTypes = {
    data: PropTypes.object,
};

export default PersonView;