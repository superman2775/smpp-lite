const default_settings = {
  quicks: [],
  profile: "birb",
  overwrite_theme: 0,
  blur: "2",
  weatherAmount: 0,
  shownews: true,
  backgroundlink: "none",
  backgroundfile: "none",
  show_scores: false,
  showplanner: true,
  name_override: null,
  smpp_logo: true,
  enableanimations: true
};

function get_config() {
  let conf = window.localStorage.getItem("settingsdata");
  if (typeof conf !== "string") {
    console.error("config is undefined. setting to default")
    conf = default_settings;
    set_config(conf)
    return conf
  }
  return JSON.parse(conf)
}
function set_config(config) {
  window.localStorage.setItem("settingsdata", JSON.stringify(config));
}
