if (typeof browser === 'undefined') { var browser = chrome; }

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  (async () => {
    // General
    if (message.action === 'clearLocalStorage') {
      browser.storage.local.clear()
      sendResponse({ succes: true });
      console.log('Cleared browser storage');
    }
    // Background image
    if (message.action === 'saveBackgroundImage') {
      await browser.storage.local.set({ backgroundImage: message.data });
      sendResponse({ succes: true });
      console.log('Background image saved.');
       }
  })();
  return true;
});
