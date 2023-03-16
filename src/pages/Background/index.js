const getStorageDataLocal = key =>
	new Promise((resolve, reject) =>
		chrome.storage.local.get(key, result =>
			chrome.runtime.lastError
			? reject(Error(chrome.runtime.lastError.message))
			: resolve(result)
		)
	)

const setStorageDataLocal = data =>
	new Promise((resolve, reject) =>
		chrome.storage.local.set(data, () =>
			chrome.runtime.lastError
			? reject(Error(chrome.runtime.lastError.message))
			: resolve()
		)
	)

chrome.runtime.onInstalled.addListener(async (details) => {
	const { previousVersion, reason } = details
	if (reason === 'install') {
		chrome.storage.sync.get(['it_1'], resp => {
			if (!resp.it_1) {
				chrome.storage.sync.set({
					it_1: ''
				})
			}
		})

		await setStorageDataLocal({
			note1: 'Hi, welcome to quick replies!',
			note2: 'We all have to write the same answers and questions all the time - it is not something we should be ashamed about. Below you will find a few examples to start with.',
			note3: "Just drag it to the message box. Don't worry, it won't be sent yet.",
			note4: 'Thank you, will do!',
			note5: '👍',
		})
	} else if (reason === 'update') {

	}

	chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
		chrome.declarativeContent.onPageChanged.addRules([
			{
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: {
							hostEquals: 'www.linkedin.com'
						},
					})
				],
				actions: [ new chrome.declarativeContent.ShowAction() ]
			}
		])
	})

	chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
		console.log(changeInfo);
		if (changeInfo.status === 'complete') {
			chrome.tabs.sendMessage(tabId, {
				message: 'TabUpdated'
			});
		}
	})
})