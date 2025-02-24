let gc_is_open = false
let gc_initialized = false
function make_iframe() {
  const GlCHatplace = document.getElementById("global_chat_window")
  let current_profile = get_config().profile
  let current_theme = get_theme(current_profile);
  if (username_override == null) {
    var placeholderTextGlChat = orig_name;
  }
  else {
    var placeholderTextGlChat = username_override;
  }
  const query_string = get_theme_as_query_string(current_theme, ["color_base00", "color_base01", "color_base02", "color_base03", "color_accent", "color_text"]);
  const GlCHatplaceHTML = `
  <iframe style="width:100%; height:100%; border:none "src = 'https://ldev.eu.org/smpp/gc/v1?placeholder=${placeholderTextGlChat}${query_string}'></iframe>
    `;
  GlCHatplace.innerHTML = GlCHatplaceHTML
}
function make_gcwin(is_hidden) {
  global_chat_window_element = document.createElement("div")
  global_chat_window_element.id = "global_chat_window"
  global_chat_window_element.classList.add("global_chat_window");
  if (is_hidden) {
    global_chat_window_element.classList.add("gc-hidden");
  }
  document.body.insertBefore(global_chat_window_element, document.body.childNodes[-1]);
  gc_is_open = false;
  document.addEventListener("click", function (e) {
    if (!gc_is_open) {
      return
    }
    if (e.target.id == "global_chat_button") {
      return
    }
    gc_close()
  })
  make_iframe()
}
function open_global_chat() {
  let win = document.getElementById("global_chat_window");
  if (win) {
    win.classList.remove("gc-hidden")
  } else {
    make_gcwin(false);
  }
  gc_initialized = true
  gc_is_open = true
}
function gc_close() {
  gc_is_open = false;
  let global_chat_window = document.getElementById("global_chat_window");
  global_chat_window.classList.add("gc-hidden");
}
function remove_gcwin() {
  let win = document.getElementById("global_chat_window");
  if (win) {
    win.remove()
  }
}

function createGCButton() {
  const topNav = document.querySelector("nav.topnav")

  const goGlChatButton = document.createElement("button");
  goGlChatButton.title="Global chat (chat met iedereen die de extensie gebruikt)"
  goGlChatButton.id = "global_chat_button"
  goGlChatButton.className = "topnav__btn"
  goGlChatButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="3009 50 450 450" class="st1">
  <g>
    <g id="Laag_1">
      <path d="M3436.9,158.5c0-3.6-.4-7-.9-10.8-2.6-20.6-12.9-39.8-29-53.9-16.3-14.2-37-22.1-58.4-22.1h-.3c-56,.2-112.9.2-168,.1-29.2,0-58.3,0-87.5,0-3.9,0-8.1.3-12.9.9-20.5,2.7-39.5,12.9-53.6,28.9-14.2,16.1-22,36.6-21.9,57.6,0,31.4,0,63.4,0,94.3,0,26.1,0,52.2,0,78.3,0,3.8.3,7.6.9,11.5,5.4,33.9,24.4,57.5,56.3,70,6.6,2.6,13.5,3.9,20.7,5.3,2.3.5,4.7.9,7.1,1.4v1.7c0,5.2,0,10.3,0,15.5,0,13.6-.1,27.8.3,41.6.2,5.9,2.4,12.3,5.8,16.7,4.2,5.5,10.2,8.8,16.7,9.2.5,0,1,0,1.5,0,6.7,0,13.2-2.9,18.6-8.3,26.5-26.4,50.9-50.9,74.5-74.7,1.9-1.9,3.5-2.5,6.2-2.5h0c51.1.1,93.2.1,132.5,0,6.7,0,13.5-.7,20.4-2,40.4-7.5,70.9-44.1,71-85.1,0-59.1,0-119.9,0-173.5h0ZM3203.6,344.5c-16.5,14.1-40.7,21.6-70,21.6s-51.3-6.3-66.1-15.2l-2.8-1.7,12.1-43,4.7,2.7c11.8,6.8,32.5,14,54.8,14s38.4-10.1,38.4-27-10.1-23.9-38.8-34c-44.9-15.6-66.8-38.7-66.8-70.6s8.6-37.8,24.1-50.4c15.9-12.9,37.9-19.8,63.7-19.8s34.1,2.6,48.1,7.7c1.2.4,2.4.9,3.9,1.5h.1c0,0,3.5,1.6,3.5,1.6l30.3,13.2,18.8-43.2,39.7,17.2-18.8,43.2,41.4,18-17.2,39.7-41.4-18-18.8,43.2-39.7-17.2,18.8-43.2-19.7-8.6v.5c-.1,0-4.8-2.3-4.8-2.3-9.4-4.8-24.9-10.4-45.3-10.4s-34.5,12.5-34.5,23.3,9.1,21.2,42.3,33.7c43.7,16,63.2,38.2,63.2,71.9s-8.3,38.7-23.4,51.6h0ZM3375.4,308.6c-3.8,11.3-8.8,22.3-14.8,32.6l-2,3.4-2-.9-34.7-15.1-19,43.7-40-17.4,19-43.7-41.9-18.2,17.4-40,41.9,18.2,19-43.7,40,17.4-19,43.7,37.4,16.2-1.3,3.7h0Z"/>
      <path style="fill: var(--color-base01)"d="M3227,292.9c0,20.4-8.3,38.7-23.4,51.6-16.5,14.1-40.7,21.6-70,21.6s-51.3-6.3-66.1-15.2l-2.8-1.7,12.1-43,4.7,2.7c11.8,6.8,32.5,14,54.8,14s38.4-10.1,38.4-27-10.1-23.9-38.8-34c-44.9-15.6-66.8-38.7-66.8-70.6s8.6-37.8,24.1-50.4c15.9-12.9,37.9-19.8,63.7-19.8s34.1,2.6,48.1,7.7c1.2.4,2.4.9,3.9,1.5h.1c0,0,3.5,1.6,3.5,1.6l30.3,13.2,18.8-43.2,39.7,17.2-18.8,43.2,41.4,18-17.2,39.7-41.4-18-18.8,43.2-39.7-17.2,18.8-43.2-19.7-8.6v.5c-.1,0-4.8-2.3-4.8-2.3-9.4-4.8-24.9-10.4-45.3-10.4s-34.5,12.5-34.5,23.3,9.1,21.2,42.3,33.7c43.7,16,63.2,38.2,63.2,71.9h0Z"/>
      <path style="fill: var(--color-base01)"d="M3376.6,304.9l-1.3,3.7c-3.8,11.3-8.8,22.3-14.8,32.6l-2,3.4-2-.9-34.7-15.1-19,43.7-40-17.4,19-43.7-41.9-18.2,17.4-40,41.9,18.2,19-43.7,40,17.4-19,43.7,37.4,16.2h0Z"/>
    </g>
  </g>
</svg>
`
  goGlChatButton.addEventListener("click",open_global_chat)

  topNav.insertBefore(goGlChatButton, topNav.querySelector(".topnav__btn--push-right"));
}
