import React from 'react';
import { connect } from "react-redux";

const UserPage = props => {
    const pathUsername = props.match.params.username;
    let message = 'we cannot edit';
    if (pathUsername === props.logedInUsername) {
        message = 'we can edit';
    }

    return (
        <div className='container'>
            {message}
        </div>
    );
};

const mapStateToProps = (store) => { // store: state in redux(loggedInState)
    return {
        logedInUsername: store.username
    };
};

export default connect(mapStateToProps)(UserPage);