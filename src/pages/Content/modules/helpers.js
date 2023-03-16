export const getStorageDataLocal = key =>
    new Promise((resolve, reject) =>
        chrome.storage.local.get(key, result =>
            chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve(result)
        )
    )

export const setStorageDataLocal = data =>
    new Promise((resolve, reject) =>
        chrome.storage.local.set(data, () =>
            chrome.runtime.lastError
            ? reject(Error(chrome.runtime.lastError.message))
            : resolve()
        )
    )

const emojis = ["😭", "🔥", "❤️", "😊", "💀", "😂", "✔️", "🎉", "👀", "🤔", "🚀", "💪"];

export const getRandomEmoji = () =>
    emojis[Math.floor(Math.random() * emojis.length)];