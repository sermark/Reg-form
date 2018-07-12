import React, { Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import { NavStyle } from './style/navigationComponent';

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
				<NavLink activeClassName="active" to="/logout" onClick={this.logout}>Logout</NavLink>
				<NavLink activeClassName="active" to="/profile">Profile</NavLink>
			</Fragment> :
			<Fragment>
				<NavLink activeClassName="active" to="/login" onClick={this.login}>Login</NavLink>
				<NavLink activeClassName="active" to="/register">Register</NavLink>
			</Fragment>;
		return (
			<NavStyle>
				<ul>
					<NavLink exact activeClassName="active" to="/">Home</NavLink>
					{authNav}
				</ul>
			</NavStyle>
		)
	}
});
