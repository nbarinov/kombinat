import PropTypes from 'prop-types';
import LogInForm from './LogInForm';

const Profile = ({ className, user, onLogIn, onLogOut }) => {
    console.log(user);
    return (!user) ?
        <LogInForm className="login-form--center" onLogIn={onLogIn} /> :
        <div className={(className) ? `${className} profile` : 'propfile'}>
            {user.lastName}
            <button onClick={onLogOut}>Log Out</button>
        </div>;
};

Profile.propTypes = {
    className: PropTypes.string,
    // user: PropTypes.oneOfType([null, PropTypes.object]).isRequired,
    onLogIn: PropTypes.func.isRequired,
    onLogOut: PropTypes.func.isRequired,
};

export default Profile;