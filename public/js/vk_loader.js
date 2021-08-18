(function() {
  // VAR 1
  var vkApiUrl = "https://vk.com/js/api/openapi.js";
  fetch(vkApiUrl, { mode: "no-cors" })
    .then(response => {
      return response;
    })
    .then(response => {
      var body = document.querySelector("body");
      var vkScriptTag = document.createElement("script");
      vkScriptTag.onload = () => {
        var vkInit = document.createElement("script");
        vkInit.src = "/js/vk.js";
        body.appendChild(vkInit);
      };
      vkScriptTag.src = vkApiUrl;
      body.appendChild(vkScriptTag);
    })
    .catch(err => {
      console.log("Can't load vk api", err);
    });

  // VAR 2 - with this page anyway are loading while
  // error timeout happs with no access to vk
  // const body = document.querySelector("body");
  // const vkApi = document.createElement("script");
  // vkApi.async = true;
  // vkApi.onload = () => {
  //   var vkInit = document.createElement("script");
  //   vkInit.src = "/js/vk.js";
  //   body.appendChild(vkInit);
  //   console.log("vk api is load");
  // };
  // vkApi.src = vkApiUrl;
  // body.appendChild(vkApi);
})();
