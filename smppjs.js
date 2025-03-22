//java script komt hier je weet wel
//ok - ldev
//oke logis - andere ldev
//oh ok, ik dacht in general.css - Jdev
const default_theme = {
  color_accent: "#a3a2ec",
  color_base00: "#38313a",
  color_base01: "#826882",
  color_base02: "#ac85b7",
  color_base03: "#c78af0",
  color_text: "#ede3e3"
}
let settingsWindowIsHidden = true;

if (browser == undefined) { var browser = chrome };

function unbloat() {
  document.body.innerHTML = '';
}
function discordpopup() {
  let discordelement = document.createElement("div")
  discordelement.innerHTML = discordSvg
  document.body.appendChild(discordelement)
}
function changeLogoutText() {
  var randomNum = Math.floor(Math.random() * 50) + 1;
  if (randomNum === 1) {
    return "Good Bye! →"
  }
  return "Log out →"
}

function openFileSelector() {
  document.getElementById('fileInput').click();
}
async function clearsettings() {
  localStorage.clear();
  await browser.runtime.sendMessage({
    action: 'clearLocalStorage'
  });
  console.log("Cleared settings!")
}
function togglePerformanceMode() {
  let config = get_config();
  config.enableanimations = !config.enableanimations
  set_config(config);
  return config.enableanimations
}
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = error => reject(error);
  });
}
const anakin = 56789;
const skywalker = 98765;

function changeFont() {
  let fontLinks = document.createElement("div")
  fontLinks.innerHTML = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">`
  document.getElementsByTagName("head")[0].appendChild(fontLinks)
}
function getPfpLink(username) {
  if (username) {
    const parts = username.trim().split(/\s+/);
    const firstInitial = parts[0][0].toUpperCase();
    const secondInitial = parts.length > 1 ? parts[1][0].toUpperCase() : '';
    return `https://userpicture20.smartschool.be/User/Userimage/hashimage/hash/initials_${firstInitial + secondInitial}/plain/1/res/32`;
  }
  return `https://userpicture20.smartschool.be/User/Userimage/hashimage/hash/initials_MU/plain/1/res/32`;
}
async function apply() {
  let style = document.documentElement.style;
  let settingsData = get_config();

  const colorpickers = document.getElementById("colorpickers");
  console.log(settingsData)
  const profileSelect = settingsData.profile
  const backgroundLink = settingsData.backgroundlink
  const overwrite_theme = settingsData.overwrite_theme;
  const shownews = settingsData.shownews;
  var show_scores = settingsData.show_scores;
  var showplanner = settingsData.showplanner;
  var enableanimations = settingsData.enableanimations;
  changeFont()
  set_theme("default");
  set_theme(profileSelect);

  if (show_scores == undefined) {
    show_scores = false;
  }
  if (showplanner == undefined) {
    settingsData = get_config()
    settingsData.showplanner = true
    showplanner = true
    set_config(settingsData)
  }
  if (enableanimations == undefined) {
    settingsData = get_config()
    settingsData.enableanimations = true
    set_config(settingsData)
  }
  topnav = document.querySelector('.topnav')
  if (topnav) {
    topnav.insertBefore(document.querySelector('[data-links]'), document.querySelector('[data-courses]'));
  }
  const notifsButton = document.querySelector('.js-btn-notifs');
  if (notifsButton) {
    const textSpan = notifsButton.querySelector('span');
    notifsButton.innerHTML = notfisSvg
    notifsButton.appendChild(textSpan);
  }
  const startButton = document.querySelector('.js-btn-home');
  if (startButton) {
    startButton.innerHTML = homeiconSvg
  }
  const messageButton = document.querySelector('.js-btn-messages');
  if (messageButton) {
    const textSpan = messageButton.querySelector('span');
    messageButton.innerHTML = messageSvg
    messageButton.appendChild(textSpan);
  }
  let login_app_left = document.querySelector('.login-app__left');
  if (login_app_left != undefined) {
    login_app_left.innerHTML = ' ';
    document.getElementsByClassName('login-app__platform-indicator')[0].innerHTML = '<h1 class="logintitle">Smartschool ++</h1>';
    document.getElementsByClassName('login-app__title--separator')[0].innerHTML = `<button type="button" class="white_text_button" id="showmore">More</button>`;
    document.getElementById('showmore').addEventListener('click', showmore)
    function showmore() { style.setProperty('--show-options', 'flex'); document.getElementById("showmore").style.display = "none" }
  }
  window.addEventListener('load', async function () {
    if (show_scores) {
      var currentUrl = window.location.href;
      if (currentUrl.includes("smartschool.be/results")) {
        await show_scoresfunc();
      }
    }
  });
  if (colorpickers != undefined && profileSelect != "custom") {
    colorpickers.innerHTML = ``
  }
  let bigblurvalue = blurvalue * 2;
  const rightContainer = document.getElementById('rightcontainer');
  const centralContainer = document.getElementById('centercontainer')
  const leftcontainer = document.getElementById('leftcontainer')
  const container = document.getElementById('container')
  if (blurvalue == 0) {
    bigblurvalue += 2;
  };
  let observer = new MutationObserver((mutations) => {
    let plannericonsactive = document.querySelector('.iconbtn--active');
    if (plannericonsactive) {
      plannericonsactive.style.backgroundColor = "var(--color-base02)";
    }
  });
  let config = { childList: true, subtree: true };
  observer.observe(document.body, config);
  if (centralContainer) {
        if (!shownews) {
      centralContainer.innerHTML = ' '
    }


    if (leftcontainer) {
      leftcontainer.innerHTML = " "
      leftcontainer.style.display = "none"
    }
    document.getElementById("leftcontainer") ? document.getElementById("leftcontainer").remove() : "pass"
    document.getElementById("rightcontainer") ? document.getElementById("rightcontainer").remove() : "pass"
    document.getElementById("plannercontainer") ? document.getElementById("plannercontainer").remove() : "pass"
  
    }
    if (showplanner) {
      var PlannerAppElement = document.createElement("div")
      PlannerAppElement.classList.add("homepage__left")
      PlannerAppElement.classList.add("smsc-container--left")
      PlannerAppElement.setAttribute("id", "plannercontainer")
      container.prepend(PlannerAppElement)
      ShowPlanner(0)
  
    }
  }

  style.setProperty('--profile-picture', 'url(' + getPfpLink(username_override) + ')');
  style.setProperty('--blur-value-large', 'blur(' + bigblurvalue + 'px)');
  style.setProperty('--blur-value-small', 'blur(' + blurvalue + 'px)');
  applyWeatherEffects(weatherSelector, weatherAmount)
  if (gc_initialized) {
    remove_gcwin()
    make_gcwin(true)
  }
  if (enableanimations) {
    document.body.classList.add("enableAnimations")
  } else {
    document.body.classList.remove("enableAnimations")
  }
  document.getElementById("background_image") ? document.getElementById("background_image").style.display = "none" : "pass"
  if (overwrite_theme == 2) {
    set_background();
  } else if (overwrite_theme == 1) {
    set_backgroundlink(backgroundLink)
  }
  let iconElement = document.querySelector('link[rel="icon"]');
  if (iconElement) {
    if (settingsData.smpp_logo) {
      iconElement.href = "https://raw.githubusercontent.com/frickingbird8002/smpp-images/main/icon128.png";
    } else {
      iconElement.href = "https://static1.smart-school.net/smsc/svg/favicon/favicon.svg";
    }
  }
}

function storeTheme() {
  const themeData = {
    color_base00: document.getElementById("colorPicker1").value,
    color_base01: document.getElementById("colorPicker2").value,
    color_base02: document.getElementById("colorPicker3").value,
    color_base03: document.getElementById("colorPicker4").value,
    color_accent: document.getElementById("colorPicker5").value,
    color_text: document.getElementById("colorPicker6").value
  };
  window.localStorage.setItem("themedata", JSON.stringify(themeData));
}

function store() {
  let previousData = get_config();
  profileSelectPrevious = previousData.profile;
  if (profileSelectPrevious == "custom") {
    storeTheme();
  }

  let settingsData = previousData;
  const profileSelect = document.getElementById("profileSelector").value;
  let backgroundFile = document.getElementById("fileInput").files[0];
  const backgroundLink = document.getElementById("backgroundlink").value
  const overwrite_theme = Number(document.getElementById("backgroundSlider").value);
  const blur = Number(document.getElementById('mySlider').value);
  const shownews = document.getElementById("shownewselement").checked;
  const showplanner = document.getElementById("showplanner").checked;
  const smpp_logo = document.getElementById("smpp_logo").checked;
  const enableAnimations = document.getElementById("performanceModeTooltip").checked;
  settingsData.profile = profileSelect;
  settingsData.overwrite_theme = overwrite_theme;
  settingsData.backgroundlink = backgroundLink
  settingsData.blur = blur;
  settingsData.shownews = shownews;
  settingsData.showplanner = showplanner;
  settingsData.smpp_logo = smpp_logo;
  settingsData.enableanimations = enableAnimations
  document.getElementById("performanceModeInfo").innerHTML = settingsData.enableanimations ? `Toggle performance mode (disabled)` : `Toggle performance mode (enabled)`
  console.log(settingsData)
  if (settingsData.show_scores == undefined) {
    settingsData.show_scores = false;
  }
  if (shownews && !previousData.shownews) {
    window.location.reload();
  }

  if (backgroundFile) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;
      browser.runtime.sendMessage({ action: 'saveBackgroundImage', data: imageData });
    };
    reader.readAsDataURL(backgroundFile);
    settingsData.overwrite_theme = 2;
    set_config(settingsData)
    if (profileSelect == "custom") {
      loadCustomTheme();
    }
    window.location.reload()
  }
  else {
    set_config(settingsData)
    if (profileSelect == "custom") {
      loadCustomTheme();
    }
    apply();
  }
};

function migrate_theme_data(old_themeData) {
  console.log("migrating_data")
  const themeData = {
    color_base00: old_themeData.base0,
    color_base01: old_themeData.base1,
    color_base02: old_themeData.base2,
    color_base03: old_themeData.base3,
    color_accent: old_themeData.accent,
    color_text: old_themeData.text
  };
  window.localStorage.setItem("themedata", JSON.stringify(themeData));
  return themeData
}

function loadCustomThemeData() {
  let themeData = JSON.parse(window.localStorage.getItem("themedata"))
  document.getElementById("colorPicker1").value = themeData.color_base00
  document.getElementById("colorPicker2").value = themeData.color_base01
  document.getElementById("colorPicker3").value = themeData.color_base02
  document.getElementById("colorPicker4").value = themeData.color_base03
  document.getElementById("colorPicker5").value = themeData.color_accent
  document.getElementById("colorPicker6").value = themeData.color_text
}
function loadCustomTheme() {
  let themeData = JSON.parse(window.localStorage.getItem("themedata"))
  if (themeData == null) {
    themeData = default_theme;
    window.localStorage.setItem("themedata", JSON.stringify(themeData));
  }
  const colorpickers = document.getElementById("colorpickers");
  colorpickers.innerHTML = colorpickersHTML
  loadCustomThemeData()
}

function load() {
  let settingsData = JSON.parse(window.localStorage.getItem("settingsdata"));
  const profileSelect = document.getElementById("profileSelector");
  const backgroundLink = document.getElementById("backgroundlink");
  const overwrite_theme = document.getElementById("backgroundSlider");
  const loc = document.getElementById("location");
  const blur = document.getElementById('mySlider');
  const shownews = document.getElementById("shownewselement");
  const showplanner = document.getElementById("showplanner");
  const smpp_logo = document.getElementById("smpp_logo");
  const enableAnimations = document.getElementById("performanceModeTooltip");
  profileSelect.value = settingsData.profile
  overwrite_theme.value = settingsData.overwrite_theme
  backgroundLink.value = settingsData.backgroundlink
  loc.value = settingsData.location
  blur.value = settingsData.blur
  shownews.checked = settingsData.shownews
  showplanner.checked = settingsData.showplanner
  smpp_logo.checked = settingsData.smpp_logo;
  enableAnimations.checked = settingsData.enableanimations;
  document.getElementById("performanceModeInfo").innerHTML = settingsData.enableanimations ? `Toggle performance mode (disabled)` : `Toggle performance mode (enabled)`
  if (profileSelect.value == "custom") {
    loadCustomTheme()
  }
}

function set_background() {
  let style = document.documentElement.style;
  browser.storage.local.get('backgroundImage', (result) => {
    style.setProperty('--loginpage-image', `none`);
    style.setProperty('--background-color', `transparent`);

    let img = document.getElementById("background_image") || document.createElement('img');
    img.id = "background_image";
    img.style.backgroundColor = "var(--color-base00)"
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '101%';
    img.style.height = '101%';
    img.style.objectFit = 'cover';
    img.style.zIndex = -1;
    img.style.display = "block";
    if (result.backgroundImage) img.src = result.backgroundImage;
    if (!document.getElementById("background_image")) {
      document.body.appendChild(img);
    }
  });
}

function set_backgroundlink(background) {
  let style = document.documentElement.style;
  if (!background) {
    style.setProperty('--loginpage-image', 'aaaaa');
    console.log("no background")
    return;
  }
  let img = new Image();
  img.src = background;
  img.onload = () => {
    style.setProperty('--loginpage-image', `url(${background})`);
    console.log("works")
  };
  img.onerror = () => {
    console.log("error")
  };
}

function set_theme(name) {
  let style = document.documentElement.style;
  if (name == "custom") {
    let themeData = JSON.parse(window.localStorage.getItem("themedata"))
    if (themeData == null) {
      themeData = default_theme;
      window.localStorage.setItem("themedata", JSON.stringify(themeData));
    }
    if (themeData.base0) {
      themeData = migrate_theme_data(themeData)
      loadCustomThemeData()
    }
    style.setProperty('--color-accent', themeData.color_accent);
    style.setProperty('--color-text', themeData.color_text);
    style.setProperty('--color-base00', themeData.color_base00);
    style.setProperty('--color-base01', themeData.color_base01);
    style.setProperty('--color-base02', themeData.color_base02);
    style.setProperty('--color-base03', themeData.color_base03);
    if (window.self == window.top) {
      style.setProperty('--loginpage-image', "url(https://wallpaperaccess.com/full/23.jpg)");
    }
  } else {
    let theme = get_theme(name);
    if (!theme) {
      return;
    }
    apply_theme(theme, style)
  }
}
function toggleSettings() {
  let win = document.getElementById("quickSettings");

  if (win && !settingsWindowIsHidden) {
    closeSettings();
  } else {
    openSettings();
  }
}

function openSettings() {
  let win = document.getElementById("quickSettings");
  if (!win) {
    createSettings();
    win = document.getElementById("quickSettings");
  }
  win.classList.remove("qs-hidden");
  load();
  settingsWindowIsHidden = false;
}

function closeSettings() {
  let win = document.getElementById("quickSettings");

  if (win) {
    win.classList.add("qs-hidden");
  }

  settingsWindowIsHidden = true;
}

function createSettings() {
  let quickSettingsWindow = document.createElement("div");
  quickSettingsWindow.id = "quickSettings";
  quickSettingsWindow.addEventListener("change", store);
  quickSettingsWindow.innerHTML = popupsettingHTML;
  quickSettingsWindow.style.left = (-270 / 3) + "px";
  document.getElementById("quickSettingsButton").insertAdjacentElement("afterend", quickSettingsWindow);

  document.getElementById("backgroundfilebutton").addEventListener("click", openFileSelector);
  document.getElementById("performanceModeTooltipLabel").addEventListener("mouseover", () => {
    document.getElementById("performanceModeInfo").style.opacity = "1";
    document.getElementById("performanceModeInfo").style.zIndex = "2";
  });
  document.getElementById("performanceModeTooltipLabel").addEventListener("mouseout", () => {
    document.getElementById("performanceModeInfo").style.opacity = "0";
    document.getElementById("performanceModeInfo").style.zIndex = "-1";
  });

  document.addEventListener("click", (e) => {
    if (settingsWindowIsHidden) return;
    if (
      e.target.id === "quickSettings" ||
      quickSettingsWindow.contains(e.target) ||
      e.target.id === "quickSettingsButton"
    ) {
      return;
    }
    closeSettings();
  });
}

function createSettingsButton() {
  let quickSettingsButtonWrapper = document.createElement("div")
  quickSettingsButtonWrapper.id = "quickSettingsButtonWrapper"
  quickSettingsButtonWrapper.classList.add("topnav__btn-wrapper")
  let logoutButton = document.querySelector(".js-btn-logout")
  if (!logoutButton) {
    return false;
  }
  let topNav = document.querySelector("nav.topnav")
  topNav.insertBefore(quickSettingsButtonWrapper, logoutButton);

  let quickSettingsButton = document.createElement("button")
  quickSettingsButton.id = "quickSettingsButton"
  quickSettingsButton.classList.add("topnav__btn")
  quickSettingsButton.innerText = "Settings"
  quickSettingsButton.addEventListener("click", toggleSettings);
  quickSettingsButtonWrapper.appendChild(quickSettingsButton)
  return true;
}

function main() {

  //createWidgetSystem();

  let logoutButton = document.querySelector(".js-btn-logout");
  if (logoutButton) logoutButton.innerHTML = changeLogoutText();

  let onHomePage = document.getElementById("container") !== null;
  if (createSettingsButton()) {

    if (onHomePage) {
      //createWidgetEditModeButton();
    }
    createGCButton();
    createQuickMenuButton();

    document.querySelector('[data-go=""]')?.remove();
    document.querySelector('.topnav__btn--icon--search').parentElement?.remove();
    let notifsLabel = document.getElementById("notifsToggleLabel");
    if (notifsLabel) notifsLabel.innerText = "Toon pop-ups"; // Simplify text. (smartschool by default has a very long explanation that doesn't fit on screen)
  }

  apply()
}
main()
