import styled from 'styled-components';

export const FormStyle = styled.form`
	width: 100%;
	max-width: 500px;
	margin: 0 auto;
	padding-top: 50px;

	input[type='submit'] {
		padding: 10px 30px;
		margin-bottom: 20px;
		font-size: 14px;
		color: #ffffff;
		background-color: #5ccfc0;
		border: none;
		border-radius: 20px;
		outline: none;
		cursor: pointer;

		&:disabled {
			background-color: gray;
		}
	}
`;
