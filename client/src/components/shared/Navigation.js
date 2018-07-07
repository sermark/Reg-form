import React from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';

export default withAuth(class Navigation extends React.Component {
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

  async login() {
    // Redirect to '/' after login
    this.props.auth.login('/');
  }

  async logout() {
    // Redirect to '/' after logout
    this.props.auth.logout('/');
  }

  componentDidUpdate() {
    this.checkAuthentication();
  }

  render() {
    if (this.state.authenticated === null) return null;
    const authNav = this.state.authenticated ?
      <ul className="auth-nav">
        <li><button onClick={this.logout}>Logout</button></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul> :
      <ul className="auth-nav">
        <li><button onClick={this.login}>Login</button></li>
        <li><Link to="/register">Register</Link></li>
      </ul>;
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