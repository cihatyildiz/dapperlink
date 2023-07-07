document.getElementById('add').addEventListener('click', () => {
    const keyInput = document.getElementById('key');
    const urlInput = document.getElementById('url');
    const key = keyInput.value.trim();
    const url = urlInput.value.trim();

    if (!key || !url) {
        alert('Both fields are required.');
        return;
    }

    if (!isValidUrl(url)) {
        alert('Please enter a valid URL.');
        return;
    }

    // Fetch the existing object
    chrome.storage.sync.get("myurlshortener", (result) => {
        let myurlshortener = result.myurlshortener || {};

        // Update the object with new key and URL
        myurlshortener[key] = url;

        // Save it back to the storage
        chrome.storage.sync.set({ "myurlshortener": myurlshortener }, () => {
            keyInput.value = '';
            urlInput.value = '';
            loadShortcuts();
        });
    });
});

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

function loadShortcuts() {
    chrome.storage.sync.get("myurlshortener", (result) => {
        const myurlshortener = result.myurlshortener || {};
        const shortcuts = document.getElementById('shortcuts');
        shortcuts.innerHTML = '';

        for (const key in myurlshortener) {
            const url = myurlshortener[key];
            shortcuts.innerHTML += `<p>${key} -> ${url}</p>`;
        }
    });
}

document.addEventListener('DOMContentLoaded', loadShortcuts);
