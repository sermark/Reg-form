import React from 'react';
import { MessageStyle } from './style/messageComponent';

const Message = ({ message }) => {
	return (
		<MessageStyle>
			{message}
		</MessageStyle>
	);
};

export default Message;
