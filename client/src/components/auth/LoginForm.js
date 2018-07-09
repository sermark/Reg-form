import React from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';

export default withAuth(class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			sessionToken: null,
			error: null,
			username: '',
			password: ''
		}

		this.oktaAuth = new OktaAuth({ url: this.props.baseUrl });
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	}

	async handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await this.oktaAuth.signIn({
				username: this.state.username,
				password: this.state.password
			});
			this.setState({
				sessionToken: res.sessionToken
			})
		} catch (error) {
			this.setState({ error: error.message });
			console.log(error.statusCode + ' error', error)
		}
	}

	handleUsernameChange(e) {
		this.setState({ username: e.target.value });
	}

	handlePasswordChange(e) {
		this.setState({ password: e.target.value });
	}

	render() {
		if (this.state.sessionToken) {
			this.props.auth.redirect({ sessionToken: this.state.sessionToken });
			return null;
		}

		const errorMessage = this.state.error && <span className="error-message">{this.state.error}</span>;

		return (
			<form onSubmit={this.handleSubmit}>
				{errorMessage}
				<div className="form-element">
					<label>Username:</label>
					<input
						id="username" type="text"
						value={this.state.username}
						onChange={this.handleUsernameChange} />
				</div>

				<div className="form-element">
					<label>Password:</label>
					<input
						id="password" type="password"
						value={this.state.password}
						onChange={this.handlePasswordChange} />
				</div>
				<input id="submit" type="submit" value="Submit" />
			</form>
		);
	}
});