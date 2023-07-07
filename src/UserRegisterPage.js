import React from "react";
import axios from "axios";

class UserRegisterPage extends React.Component {

    state = {
        name: null,
        surname: null,
        username: null,
        hospitalIdNumber: null,
        role: null,
        password: null,
        passwordRepeat: null,
        agreedClicked: false
    };

    // onChangeName = (event) => {
    //     this.setState({
    //         name: event.target.value
    //     });
    // };

    // onChangeSurname = (event) => {
    //     this.setState({
    //         surname: event.target.value
    //     });
    // };

    // onChangeSurHospitalID = (event) => {
    //     this.setState({
    //         hospitalID: event.target.value
    //     });
    // };

    // onChangeSurPassword = (event) => {
    //     this.setState({
    //         password: event.target.value
    //     });
    // };

    // onChangeSurPasswordRepeat = (event) => {
    //     this.setState({
    //         passwordRepeat: event.target.value
    //     });
    // };

    onChange = event => {
        // const name = event.target.name;
        // const value = event.target.value;

        const { name, value } = event.target;

        this.setState({
            [name]: value
        })
    }

    onChangeAgree = event => {
        this.state.agreedClicked = event.target.checked;
        console.log(this.state);
        this.setState({
            agreedClicked: event.target.checked
        });
    };

    onClickRegister = event => {
        event.preventDefault();
        // The browser's automatic sending of form content is blocked.
        // The content should be taken from the state, not the form.

        const { username, name, surname, hospitalIdNumber, password, role } = this.state;

        const body = {
            // username: username,
            // If the variable names of key and value are the same, it is sufficient to write one of them.
            username,
            name,
            surname,
            hospitalIdNumber,
            password,
            role
        };

        axios.post('/admins/save', body)
    }

    render() {
        return (
            <form>
                <h1>Sign Up..</h1>
                <div>
                    <label>Name</label>
                    <input name="name" onChange={this.onChange} />
                </div>
                <div>
                    <label>Surname</label>
                    <input name="surname" onChange={this.onChange} />
                </div>
                <div>
                    <label>Username</label>
                    <input name="username" onChange={this.onChange} />
                </div>
                <div>
                    <label>Hospital ID Number</label>
                    <input name="hospitalIdNumber" onChange={this.onChange} />
                </div>
                <div>
                    <label>User Role</label>
                    <input name="role" onChange={this.onChange} />
                </div>
                <div>
                    <label>Password</label>
                    <input name="password" type="password" onChange={this.onChange} />
                </div>
                <div>
                    <label>Password Repeat</label>
                    <input name="passwordRepeat" type="password" onChange={this.onChange} />
                </div>
                <input type="checkbox" onChange={this.onChangeAgree} /> Agreed
                <br />
                <button
                    onClick={this.onClickRegister}
                    disabled={!this.state.agreedClicked}>Sign Up</button>
            </form>
        )
    }
}

export default UserRegisterPage;