export const getStorageDataLocal = (key: string | string[] | { [key: string]: any; } | null) =>
	new Promise((resolve, reject) =>
		chrome.storage.local.get(key, result =>
			chrome.runtime.lastError
			? reject(Error(chrome.runtime.lastError.message))
			: resolve(result)
		)
	)

export const setStorageDataLocal = (data: { [key: string]: any; }) =>
	new Promise<void>((resolve, reject) =>
		chrome.storage.local.set(data, () =>
			chrome.runtime.lastError
			? reject(Error(chrome.runtime.lastError.message))
			: resolve()
		)
	)

const emojis = ["😭", "🔥", "❤️", "😊", "💀", "😂", "✔️", "🎉", "👀", "🤔", "🚀", "💪"];

export const getRandomEmoji = () =>
	emojis[Math.floor(Math.random() * emojis.length)];