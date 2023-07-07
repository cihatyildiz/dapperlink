chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        const url = details.url;
        const shortenerPrefix = "http://go/";

        if (url.startsWith(shortenerPrefix)) {
            const shortcut = url.slice(shortenerPrefix.length);

            return new Promise((resolve) => {
                chrome.storage.sync.get(shortcut, (items) => {
                    if (items && items[shortcut]) {
                        resolve({ redirectUrl: items[shortcut] });
                    } else {
                        resolve({});
                    }
                });
            });
        }
    },
    { urls: ["<all_urls>"] },
    ["blocking"]
);

chrome.action.onClicked.addListener(() => {
    chrome.runtime.openOptionsPage();
});


