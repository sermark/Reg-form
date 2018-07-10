import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import Input from '../custom/input';
import validationHelper from '../../services/validation';
import Message from '../custom/message';
import { FormStyle } from './style/FormComponent';

import config from '../../app.config';

export default withAuth(class RegistrationForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: {
				value: '',
				isValid: false,
				error: null,
			},
			lastName: {
				value: '',
				isValid: false,
				error: null,
			},
			email: {
				value: '',
				isValid: false,
				error: null,
			},
			password: {
				value: '',
				isValid: false,
				error: null,
			},
			sessionToken: null,
			errorMessage: null,
			isValidForm: false
		};
		this.oktaAuth = new OktaAuth({ url: config.url });
		this.checkAuthentication = this.checkAuthentication.bind(this);
		this.checkAuthentication();

		this.handleUserSubmit = this.handleUserSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}

	async checkAuthentication() {
		const sessionToken = await this.props.auth.getIdToken();
		if (sessionToken) {
			this.setState({ sessionToken });
		}
	}

	componentDidUpdate() {
		this.checkAuthentication();
	}

	handleUserInput(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: {
				value,
				isValid: validationHelper.validate(name, value).isValid,
				error: validationHelper.validate(name, value).error
			}
		});
	}

	async handleUserSubmit(e) {
		e.preventDefault();
		const { firstName, lastName, email, password, sessionToken } = this.state;
		const sendData = {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			password: password.value,
			sessionToken
		}
		try {
			const response = await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(sendData)
			})
			if (response.status !== 201) {
				const data = await response.json();
				this.setState({
					errorMessage: data.message
				});
				return;
			}
			const res = await this.oktaAuth.signIn({
				username: email.value,
				password: password.value
			});
			this.setState({
				sessionToken: res.sessionToken
			});
		} catch (error) {
			console.warn(error)
		}
	}

	render() {
		if (this.state.sessionToken) {
			this.props.auth.redirect({ sessionToken: this.state.sessionToken });
			return null;
		}
		const { email, firstName, lastName, password, errorMessage } = this.state;
		const isValidForm = email.isValid && firstName.isValid && lastName.isValid && password.isValid;
		return (
			<FormStyle onSubmit={this.handleUserSubmit}>
				<Input
					name='email'
					type='email'
					placeholder='Email'
					changeInput={this.handleUserInput}
					value={email.value}
					isValid={email.isValid}
					error={email.error}
				/>
				<Input
					name='firstName'
					type='text'
					placeholder='First name'
					changeInput={this.handleUserInput}
					value={firstName.value}
					isValid={firstName.isValid}
					error={firstName.error}
				/>
				<Input
					name='lastName'
					type='text'
					placeholder='Last name'
					changeInput={this.handleUserInput}
					value={lastName.value}
					isValid={lastName.isValid}
					error={lastName.error}
				/>
				<Input
					name='password'
					type='password'
					placeholder='Pasword'
					changeInput={this.handleUserInput}
					value={password.value}
					isValid={password.isValid}
					error={password.error}
				/>
				<input type='submit' id='submit' value='Register' disabled={!isValidForm} />
				<Message message={errorMessage} />
			</FormStyle>
		);
	}
});
