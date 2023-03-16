import { getStorageDataLocal, setStorageDataLocal, getRandomEmoji } from './modules/helpers';

const messTempl = (text: string) =>
	`<div class="RomanistHere__message_links_wrap">
        <a href="#" class="RomanistHere__message_btn RomanistHere__message_edit">Edit</a>
        <a href="#" class="RomanistHere__message_btn RomanistHere__message_save">Save</a>
        <a href="#" class="RomanistHere__message_btn RomanistHere__message_remove">Clear</a>
    </div>
    <textarea class="RomanistHere__message_textarea">${text}</textarea>
    <a href="#" class="RomanistHere__message_text_span">${text}</a>`

const addMechanics = (div: HTMLElement, text: string, storedNote: any) => {
	div.innerHTML = messTempl(text)

	const textArea: HTMLInputElement | null = div.querySelector('.RomanistHere__message_textarea')
	const textItem = div.querySelector('.RomanistHere__message_text_span')
	const deleteItem = div.querySelector('.RomanistHere__message_remove')

	const save = async (newText: string) => {
		textArea?.classList.remove('RomanistHere__message_textarea-visible')
		textItem?.classList.remove('RomanistHere__message_text_span-hide')

		addMechanics(div, newText, storedNote)
		const objToSave = { [storedNote]: newText }
		await setStorageDataLocal(objToSave)
	}

	textItem?.addEventListener('click', e => {
		e.preventDefault()
	})

	textArea?.addEventListener('keydown', e => {
		if (e.keyCode === 13 && e.ctrlKey) {
			const newText = textArea.value
			save(newText)
		}
	})

	div.querySelector('.RomanistHere__message_edit')?.addEventListener('click', e => {
		e.preventDefault()
		document.querySelector('.RomanistHere__mess_wrap')?.classList.add('RomanistHere__mess_wrap-active')
		textArea?.classList.add('RomanistHere__message_textarea-visible')
		textItem?.classList.add('RomanistHere__message_text_span-hide')
	})

	div.querySelector('.RomanistHere__message_save')?.addEventListener('click', e => {
		e.preventDefault()
		const newText = textArea?.value
		save(newText || getRandomEmoji())
	})

	deleteItem?.addEventListener('click', e => {
		e.preventDefault()
		save(getRandomEmoji())
	})
}

const getMessTempl = async (storedNote: string) => {
	const resp: any = await getStorageDataLocal(storedNote)

	const text = resp[storedNote]
	const div = document.createElement("DIV")
	div.classList.add('RomanistHere__message')

	addMechanics(div, text, storedNote)

	return div
}

const getMessWrapTempl = () => {
	const addLinkTempl = `<a href="#" class="RomanistHere__show_btn">Click</a>`
	const div = document.createElement("DIV")

	div.classList.add('RomanistHere__mess_wrap')
	div.innerHTML = addLinkTempl

	div.querySelector('.RomanistHere__show_btn')?.addEventListener('click', e => {
		e.preventDefault()
		const link = e.currentTarget

		div.classList.toggle('RomanistHere__mess_wrap-active')
	})

	return div
}

const removeMess = () => {
	document.querySelectorAll('.RomanistHere__mess_wrap').forEach(elem => elem.remove())
}

const showTempl = async () => {
	if (document.querySelector('.RomanistHere__mess_wrap')) {
		return
	}

	const wrap = getMessWrapTempl()

	const messTempl1 = await getMessTempl('note1')
	const messTempl2 = await getMessTempl('note2')
	const messTempl3 = await getMessTempl('note3')
	const messTempl4 = await getMessTempl('note4')
	const messTempl5 = await getMessTempl('note5')

	wrap.appendChild(messTempl1)
	wrap.appendChild(messTempl2)
	wrap.appendChild(messTempl3)
	wrap.appendChild(messTempl4)
	wrap.appendChild(messTempl5)

	removeMess();
	document.body.appendChild(wrap)
}

const initMessTempl = () => {
	if (!window.location.href.includes('linkedin.com/messaging/thread')) {
		removeMess()
		return
	}

	if (document.querySelector('.RomanistHere__mess_wrap')) {
		return
	}

	chrome.storage.local.get('messOn', resp => {
		const { messOn } = resp

		if (messOn == null || messOn === true) {
			showTempl()
			return
		}
	})
}

initMessTempl()

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.message === 'TabUpdated') {
		initMessTempl();
	}
})