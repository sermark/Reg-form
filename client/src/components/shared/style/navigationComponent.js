import styled from 'styled-components';

export const NavStyle = styled.nav`
	padding: 50px;
	background-color: #61d4c3;

	ul {
		display: flex;

		a {
			display: inline-block;
			margin: 0 10px;
			background-color: #4c5c72;
			padding: 15px 25px;
			border-radius: 20px;
			color: #a1a9b5;
			text-decoration: none;
			text-transform: uppercase;
			&.active {
				background-color: #a5555c;
				color: #ffffff;
			}
		}
	}
`