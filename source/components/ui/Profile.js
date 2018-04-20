import { connect } from 'react-redux';
import { userLogIn, userLogOut } from '../../actions';


const Profile = ({ user, onLogIn, onLogOut }) => {
    return <div>
        {`${user}`}
        <br />
        <button onClick={(!user) ? () => onLogIn(1) : () => onLogOut()}>
            {(user) ? 'log out' : 'log in'}
        </button>
    </div>;
};

export default connect(
    ({ user }) => ({ user }),
    dispath => ({
        onLogIn(id) {
            dispath(userLogIn(id));
        },
        onLogOut() {
            dispath(userLogOut());
        }
    })
)(Profile);