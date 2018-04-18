const List = ({ data }) => (
    <div>
        <ul className="list">
            {data.map((person, i) => {
                const { lastName, firstName, middleName, schoolName, balance } = person;

                return <li key={i}>{lastName} {firstName} {middleName}, {schoolName}, {balance}₽</li>;
            })}
        </ul>
        <p><i>{data.length} rows</i></p>
    </div>
);

export default List;