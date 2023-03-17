import React from "react"

// todo: convert elem to plain js and then use in context script
export const TextItem = (text: string) => {
	return  <>
		<div className="RomanistHere__message_links_wrap">
			<button className="RomanistHere__message_btn RomanistHere__message_edit">Edit</button>
			<button className="RomanistHere__message_btn RomanistHere__message_save">Save</button>
			<button className="RomanistHere__message_btn RomanistHere__message_remove">Clear</button>
		</div>
		<textarea className="RomanistHere__message_textarea">${text}</textarea>
		<a href="#" className="RomanistHere__message_text_span">${text}</a>
	</>
}