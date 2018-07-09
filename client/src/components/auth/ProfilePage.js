import React, { Component } from 'react';
import { withAuth } from '@okta/okta-react';

export default withAuth(class ProfilePage extends Component {
	constructor(props) {
		super(props);
		this.state = { user: null };
		this.getCurrentUser = this.getCurrentUser.bind(this);
	}

	async getCurrentUser() {
		try {
			const user = await this.props.auth.getUser();
			this.setState({ user });
		} catch (error) {
			console.log(error + ' error', error)
		}
	}

	componentDidMount() {
		this.getCurrentUser();
	}

	render() {
		if (!this.state.user) return null;
		return (
			<section className="user-profile">
				<h1>User Profile</h1>
				<div>
					<label>Name:</label>
					<span>{this.state.user.name}</span>
				</div>
			</section>
		)
	}
});
