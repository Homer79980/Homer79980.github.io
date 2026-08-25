(function () {
  "use strict";

  var versionNodes = document.querySelectorAll("[data-product-version]");
  if (!versionNodes.length) return;

  fetch("./data/releases.json", { cache: "no-store" })
    .then(function (response) {
      if (!response.ok) throw new Error("release manifest unavailable");
      return response.json();
    })
    .then(function (manifest) {
      var versions = {};
      (manifest.products || []).forEach(function (product) {
        versions[product.id] = product.version;
      });
      versionNodes.forEach(function (node) {
        var version = versions[node.getAttribute("data-product-version")];
        if (version) node.textContent = version;
      });
    })
    .catch(function () {
      versionNodes.forEach(function (node) {
        node.textContent = "查看版本";
      });
    });
})();
