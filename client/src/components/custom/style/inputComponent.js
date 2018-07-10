import styled from 'styled-components';

export const InputWrapper = styled.div`
	position: relative;

	&:last-of-type {
		margin-bottom: 40px;
	}

	span {
		position: absolute;
		bottom: -8px;
		left: 0;
		right: 0;
	}
`
export const InputStyle = styled.input`
	width: 100%;
	padding: 10px 0;
	border: none;
	border-bottom: 1px solid #4e5d6f;
	font-size: 14px;
	color: #76818f;
	outline: none;
	background-color: #2a394c;

	&:-webkit-autofill {
		-webkit-box-shadow: inset 0 0 0 50px #2a394c;
		-webkit-text-fill-color: #76818f;
	}
`;

export const LabelStyle = styled.label`
	display: block;
	margin-bottom: 15px;
	padding: 10px 2px;
	font-size: 16px;
	color: #f6f7f8;
	text-transform: uppercase;

	p {
		margin-bottom: 10px;
	}
`;
