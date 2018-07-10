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
				{/* <li><Link to='/logout' className={(location.pathname === '/logout') ? 'active' : ''} onClick={this.logout}>Logout</Link></li>
				<li><Link to='/profile' className={(location.pathname === '/profile') ? 'active' : ''} >Profile</Link></li> */}

				<NavLink activeClassName="active" to="/logout" onClick={this.logout}>Logout</NavLink>
				<NavLink activeClassName="active" to="/profile">Profile</NavLink>
			</Fragment> :
			<Fragment>
				{/* <li><Link to='/login' onClick={this.login} className={(location.pathname === '/login') ? 'active' : ''}>Login</Link></li>
				<li><Link to='/register' className={(location.pathname === '/register') ? 'active' : ''}>Register</Link></li> */}

				<NavLink activeClassName="active" to="/login" onClick={this.login}>Login</NavLink>
				<NavLink activeClassName="active" to="/register">Register</NavLink>
			</Fragment>;
		return (
			<NavStyle>
				<ul>
					{/* <li><Link to='/' className={(location.pathname === '/') ? 'active' : ''}>Home</Link></li> */}
					<NavLink exact activeClassName="active" to="/">Home</NavLink>
					{authNav}
				</ul>
			</NavStyle>
		)
	}
});