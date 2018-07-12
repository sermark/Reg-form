import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';

injectGlobal`
	${reset};
	
  html {
		height: 100%;
		display: block;
	}

	body {
		display: flex;
		flex-direction: column;
		font-family: sans-serif;
		height: 100%;
	}

	#root {
		flex-grow: 1;
		background-color: #2a394c;
	}

`;
