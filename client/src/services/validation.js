export default {
	validate(fieldName, value) {
		switch (fieldName) {
			case 'firstName':
				return this.validateName(value);
			case 'lastName':
				return this.validateName(value);
			case 'email':
				return this.validateEmail(value);
			case 'password':
				return this.validatePassword(value);
			default:
				return false;
		}
	},

	validateName(value) {
		const form = {
			isValid: false,
			error: '',
		};
		form.isValid = !!value.match(/[^\s]{3,100}$/);
		form.error = form.isValid ? '' : 'At least 3 characters long';
		return form;
	},

	validateEmail(value) {
		const form = {
			isValid: false,
			error: '',
		};

		form.isValid = !!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
		form.error = form.isValid ? '' : 'Is invalid';
		return form;
	},

	validatePassword(value) {
		const form = {
			isValid: false,
			error: '',
		};

		form.isValid = !!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
		form.error = form.isValid ? '' : 'At least 8 characters, min 1 number, min 1 uppercase and 1 lowercase letter';
		return form;
	}
};
