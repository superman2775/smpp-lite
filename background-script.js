if (typeof browser === 'undefined') { var browser = chrome; }

import { getWeatherAppData, getDelijnAppData, getWidgetData } from './data-background-script.js';
import { fetchWeatherData, fetchDelijnData } from './api-background-script.js';

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
    // Weather
    if (message.action === 'setWeatherAppData') {
      await browser.storage.local.set({ weatherAppData: message.data });
      sendResponse({ succes: true });
      console.log('Weather appdata saved.');
    }
    if (message.action === 'getWeatherAppData') {
      const weatherAppData = await getWeatherAppData(message.location);
      sendResponse(weatherAppData);
      console.log('Weather appdata sent.');
    }
    if (message.action === 'fetchWeatherData') {
      const weatherData = await fetchWeatherData(message.location);
      sendResponse(weatherData);
      console.log('Weather data fetched and sent.');
    }
    // Delijn
    if (message.action === 'setDelijnAppData') {
      await browser.storage.local.set({ delijnAppData: message.data });
      sendResponse({ succes: true });
      console.log('Delijn data saved.');
    }
    if (message.action === 'getDelijnAppData') {
      const delijnAppData = await getDelijnAppData();
      sendResponse(delijnAppData);
      console.log('Delijn appdata sent.');
    }
    if (message.action === 'fetchDelijnData') {
      const delijnData = await fetchDelijnData(message.url);
      sendResponse(delijnData);
      console.log('Delijn data fetched and sent.');
    }

    // Widgets
    if (message.action === "getWidgetData") {
      console.log("getting widget data");
      let widgetData = await getWidgetData();
      sendResponse(widgetData);
    }
  })();
  return true;
});
