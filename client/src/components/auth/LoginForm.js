import React, { Component } from 'react';
import OktaAuth from '@okta/okta-auth-js';
import { withAuth } from '@okta/okta-react';
import Input from '../custom/input';
import validationHelper from '../../services/validation';
import Message from '../custom/message';
import { FormStyle } from './style/FormComponent';

export default withAuth(class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sessionToken: null,
			errorMessage: null,
			email: {
				value: '',
				isValid: false,
				error: null
			},
			password: {
				value: '',
				isValid: false,
				error: null
			}
		}

		this.oktaAuth = new OktaAuth({ url: this.props.baseUrl });
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleUserInput = this.handleUserInput.bind(this);
	}

	async handleSubmit(e) {
		e.preventDefault();
		try {
			const res = await this.oktaAuth.signIn({
				username: this.state.email.value,
				password: this.state.password.value
			});
			this.setState({
				sessionToken: res.sessionToken
			})
		} catch (error) {
			this.setState({ errorMessage: error.message });
			console.log(error.statusCode + ' error', error)
		}
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

	render() {
		if (this.state.sessionToken) {
			this.props.auth.redirect({ sessionToken: this.state.sessionToken });
			return null;
		}
		const { email, password, errorMessage } = this.state;
		const isValidForm = email.isValid && password.isValid;
		return (
			<FormStyle onSubmit={this.handleSubmit}>
				<Input
					name='email'
					type='text'
					placeholder='Email'
					changeInput={this.handleUserInput}
					value={email.value}
					isValid={email.isValid}
					error={email.error}
				/>
				<Input
					name='password'
					type='password'
					placeholder='Password'
					changeInput={this.handleUserInput}
					value={password.value}
					isValid={password.isValid}
					error={password.error}
				/>
				<input id='submit' type='submit' value='Submit' disabled={!isValidForm} />
				<Message message={errorMessage} />
			</FormStyle>
		);
	}
});
