import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Navigation extends Component {
	constructor(props) {
		super(props);
		this.state = { authenticated: null };
		this.checkAuthentication = this.checkAuthentication.bind(this);
		this.checkAuthentication();
		this.checkAuthentication = this.checkAuthentication.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}

	async checkAuthentication() {
		const authenticated = await this.props.auth.isAuthenticated();
		if (authenticated !== this.state.authenticated) {
			this.setState({ authenticated });
		}
	}

	login() {
		this.props.auth.login('/');
	}

	logout() {
		this.props.auth.logout('/');
	}

	componentDidUpdate() {
		this.checkAuthentication();
	}

	render() {
		if (this.state.authenticated === null) return null;

		const authNav = this.state.authenticated ?
			<Fragment>
				<li><Link to="/logout" onClick={this.logout}>Logout</Link></li>
				<li><Link to="/profile">Profile</Link></li>
			</Fragment> :
			<Fragment>
				<li><Link to="/login" onClick={this.login}>Login</Link></li>
				<li><Link to="/register">Register</Link></li>
			</Fragment>;
		return (
			<nav>
				<ul>
					<li><Link to="/">Home</Link></li>
					{authNav}
				</ul>
			</nav>
		)
	}
});