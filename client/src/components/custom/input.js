import React from 'react';
import Message from './message';
import { InputStyle, LabelStyle, InputWrapper } from './style/inputComponent';


const Input = ({ name, type, value, placeholder, changeInput, isValid, error }) => {
	return (
		<InputWrapper>
			<LabelStyle htmlFor={name}>
				<p>{name}</p>
				<InputStyle
					id={name}
					name={name}
					type={type}
					placeholder={placeholder}
					onChange={e => changeInput(e)}
					value={value}
				/>
			</LabelStyle>
			{!isValid && <Message message={error} />}
		</InputWrapper>
	);
};

export default Input;
