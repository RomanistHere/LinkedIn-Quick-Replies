import React from 'react';
import './Popup.css';

const Popup = () => {
	return (
		<div className="App">
			<header className="App-header">
				LinkedIn Quick Replies by
				<a className="App-link" target="_blank" href="https://www.linkedin.com/in/romanist/" rel="noreferrer">
					RomanistHere
				</a>
				<p>
					Send me a word if you want more quick reply slots, a sync to share notes between devices or ChatGPT's help.
				</p>
				Version 0.1.0
			</header>
		</div>
	);
};

export default Popup;
