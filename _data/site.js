/* jshint esversion:6 */
// eslint-disable-next-line no-undef
module.exports = function() {
    // eslint-disable-next-line no-undef
    const environmentVal = process.env.MY_ENVIRONMENT || "development";
    let domainVal, basedomainVal, assetsVal, development_siteVal;

    if ( environmentVal === "development") {
        domainVal = "http://localhost:8080";
        assetsVal = "http://localhost:8080/assets";
        basedomainVal = "http://localhost:8080";
        development_siteVal = true;
    } else if ( environmentVal === "github" ) {
        domainVal = "https://greenpeace.github.io/gpes-solar-photovoltaic-calculator";
        assetsVal = "https://greenpeace.github.io/gpes-solar-photovoltaic-calculator/assets";
        basedomainVal = "https://greenpeace.github.io";
        development_siteVal = true;
    } else if ( environmentVal === "local" ) {
      domainVal = "https://localhost/es/trabajamos-en/cambio-climatico/energias-renovables/guia-autoconsumo";
      assetsVal = "https://localhost/es/wp-content/themes/guia-autoconsumo/assets";
      basedomainVal = "https://localhost";
      development_siteVal = false;
  } else if ( environmentVal === "staging" ) {
    domainVal = "https://gpstaging.enpruebas.net/es/trabajamos-en/cambio-climatico/energias-renovables/guia-autoconsumo";
    assetsVal = "https://gpstaging.enpruebas.net/wp-content/themes/guia-autoconsumo/assets";
    basedomainVal = "https://gpstaging.enpruebas.net";
    development_siteVal = false;
  } else if ( environmentVal === "prod" ) {
    domainVal = "https://es.greenpeace.org/es/trabajamos-en/cambio-climatico/energias-renovables/guia-autoconsumo";
    assetsVal = "https://es.greenpeace.org/wp-content/themes/guia-autoconsumo/assets";
    basedomainVal = "https://es.greenpeace.org";
    development_siteVal = false;
  }

    return {
      environment: environmentVal,
      domain : domainVal,
      basedomain: basedomainVal,
      assets : assetsVal,
      development_site : development_siteVal,
      version: "0.1"
    };
  };
