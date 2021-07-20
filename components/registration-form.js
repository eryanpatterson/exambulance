import React from 'react';
import Layout from './layout';

class RegForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            userType: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <Layout>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        First Name:
                        <input name='first' type='text' value={this.state.first} onChange={this.handleChange} />
                    </label>
                    <label>
                        Last Name:
                        <input name='last' type='text' value={this.state.last} onChange={this.handleChange} />
                    </label>
                    <label>
                        Email:
                        <input name='email' type='email' value={this.state.email} onChange={this.handleChange} />
                    </label>
                    <label>
                        Password:
                        <input name='password' type='password' value={this.state.password} onChange={this.handleChange} />
                    </label>
                    <label>
                        Repeat Password:
                        <input name='repeatPass' type='password' value='this.state.repeatPass' onChange={this.handleChange} />
                    </label>
                    <label onChange={this.handleChange}>
                        <input name='role' type='radio' value='student' />
                        <input name='role' type='radio' value='instructor' />
                    </label>
                    <input />
                </form>
            </Layout>
        )
    }
}

export default RegForm