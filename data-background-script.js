if (typeof browser === 'undefined') { var browser = chrome; }

export async function getWidgetData() {
  let data = await browser.storage.local.get("widgets");
  return data.widgets || {
    leftPannels: [],
    rightPannels: [
      {
        widgets:[ "TestWidget" ]
      }
    ],
  };

}

export async function getWeatherAppData(location) {
  let data = await browser.storage.local.get("weatherAppData");
  let weatherAppData = data.weatherAppData || {
    weatherData: null,
    lastUpdateDate: new Date().toISOString(),
    lastLocation: location || ""
  };

  weatherAppData.lastUpdateDate = new Date(weatherAppData.lastUpdateDate).toISOString();

  await browser.storage.local.set({
    weatherAppData: {
      weatherData: weatherAppData.weatherData,
      lastUpdateDate: weatherAppData.lastUpdateDate,
      lastLocation: weatherAppData.lastLocation
    }
  });

  return weatherAppData;
}

export async function getDelijnAppData() {
  let data = await browser.storage.local.get("delijnAppData");
  let delijnAppData = data.delijnAppData || {
    entiteitnummer: null,
    haltenummer: null,
  };

  return delijnAppData;
}
