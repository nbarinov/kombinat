const Profile = ({ user, onLogIn, onLogOut }) => {
    return <div>
        {`${user}`}
        <br />
        <button onClick={(!user) ? () => onLogIn(1) : () => onLogOut()}>
            {(user) ? 'log out' : 'log in'}
        </button>
    </div>;
};

export default Profile;