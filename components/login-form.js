import React from "react";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        alert('Email is: ' + this.state.email + 'Password is: ' + this.state.password);
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Email:
                    <input name='email' type='email' value={this.state.email} onChange={this.handleChange} />
                </label>
                <label>
                    Password:
                    <input name='password' type='password' value={this.state.password} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Login" />
            </form>
        )
    }

}

export default LoginForm