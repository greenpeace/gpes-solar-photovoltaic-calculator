/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* jshint esversion:6 */

const trackingScripts = {

    /**
     * Propriety to check if the tracking has initialized.
     */
    hasInitialized: false,
    
    /**
     * Runs all the tracking scripts checking permissions
     */
    initAll: function () {
    
        if (cookieTrackingManager.canItrack("analytics")) {
            gtag('consent', 'update', {'analytics_storage': 'granted'});        
            this.googleAnalyticsFooter();
            this.googleTagManager();
            this.hotjar();
        } else {
            this.googleAnalyticsFooter();
        }

        if (cookieTrackingManager.canItrack("segmentation")) { /* empty */ }
        
        if (cookieTrackingManager.canItrack("advertisement")) {
            gtag('consent', 'update', {'ad_storage': 'granted'});
            this.facebook();
            this.twitter();
            this.outbrain();
            this.tiktok();
        }
        
        if (cookieTrackingManager.canItrack("segmentation") && cookieTrackingManager.canItrack("advertisement") ) {
            this.hubspot();
        }

        this.hasInitialized = true;

    },
    
    
    // ----------- Analytics ----------- 

    /**
     * Google Analytics, footer part
     */
    googleAnalyticsFooter: function () {

        if ( typeof gtag === "function") {           
            gtag('config', 'G-7NL9SM5MNP', googleTrackingConfig);
        }
                        
    },

    /**
     * Hotjar initialization
     */
    hotjar: function () {
        
        (function(h,o,t,j,a,r){
            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
            h._hjSettings={hjid:1356277,hjsv:6};
            a=o.getElementsByTagName('head')[0];
            r=o.createElement('script');r.async=1;
            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
            a.appendChild(r);
        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

    },
    
    /**
     * Google Tag Manager initialization
     */
    googleTagManager: function() {
        
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-K9LBN3C');
    
    },

    /**
     * Hubspot initalization and pageview
     */
    hubspot: function () {
        
        // Needs <div id="hubspotEmbed"></div> in the html before using this script FIXME
        var t = document.getElementById("hubspotEmbed"),
            e = document.createElement("script");
        e.src = "//js.hs-scripts.com/5361482.js"; 
        e.setAttribute("id", "hs-script-loader"); 
        e.setAttribute("type", "text/javascript"); 
        e.setAttribute("defer", "defer"); 
        e.setAttribute("async", "async"); 
        t.appendChild(e);
        
    },
    
    // ----------- Advertising ----------- 


    /**
     * Facebook initialization and pageview
     */
    facebook: function () {

        !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
        document,'script','//connect.facebook.net/en_US/fbevents.js');

        fbq('init', '1055834218174209'); // De GPI
        fbq('track', "PageView");
        
    },
    
    /**
     * Twitter initialization
     */
    twitter: function () {
            
            !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
            },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
            a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
            twq('config','nx9ab');
        
    },
    
    /**
     * Outbrain initialization and page view
     */
    outbrain: function () {

      !function(_window, _document) {
        var OB_ADV_ID='002d6df58f70160012cc266f46bbd90888';
        if (_window.obApi) {var toArray = function(object) {return Object.prototype.toString.call(object) === '[object Array]' ? object : [object];};_window.obApi.marketerId = toArray(_window.obApi.marketerId).concat(toArray(OB_ADV_ID));return;}
        var api = _window.obApi = function() {api.dispatch ? api.dispatch.apply(api, arguments) : api.queue.push(arguments);};api.version = '1.1';api.loaded = true;api.marketerId = OB_ADV_ID;api.queue = [];var tag = _document.createElement('script');tag.async = true;tag.src = '//amplify.outbrain.com/cp/obtp.js';tag.type = 'text/javascript';var script = _document.getElementsByTagName('script')[0];script.parentNode.insertBefore(tag, script);}(window, document);
        obApi('track', 'PAGE_VIEW');
        
    },

    /**
     * Tiktok initialization and page view
     */
     tiktok: function(){
        !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++
  )ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=i+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
          
            ttq.load('CAG7KOBC77UEV29MNQO0');
            ttq.page();
          }(window, document, 'ttq');
    }

    
};


/**
 * On form submit sucessfuly
 */
 document.addEventListener('form:submit', function (e) {
    const existingOrNew = e.detail.was_contact ? 'Existing' :'New';
    gtag("event", "Signup", {
        "event_category": 'Autoconsumo',
        "event_label" : "?FIXME",
        "value": 0, // FIXME Nuevo valor para firma
        "new_email" : existingOrNew == "New" ? true : false,
        "has_phone" : true,
        "has_zip" : false
    });

    if ( existingOrNew == "New"){
        gtag('event', "generate_lead", {
            "currency" : "EUR",
            "value":  5
        });
    }

    if ( typeof(fbq) == "function" && cookieTrackingManager.canItrack("advertisement") ) {
        fbq('track', 'PageView');
        fbq('track', 'Lead');

        if ( existingOrNew === 'New') {
            fbq('track', 'Subscribe');
        }    
    }
    const adwordsEnhacedConversion = function(conversion_id){
        if ( cookieTrackingManager.canItrack("advertisement") ) {
            gtag('js', new Date());
            gtag('config','AW-' + conversion_id, {'allow_enhanced_conversions':true});
            window.userEmail = document.getElementById("email").value.trim();
            window.userPhone = document.getElementById("phone_number").value.trim() ? String("+34" + document.getElementById("phone_number").value.trim()) : "";
            gtag('set', 'user_data', {
            "email": window.userEmail,
            "phone_number": window.userPhone
            });
        }
    };
    adwordsEnhacedConversion(1053230267); // Display

    const adwordsConversion = function(conversion_id, conversion_label) {
        if ( cookieTrackingManager.canItrack("advertisement") ) {
            gtag('event', 'conversion', {
                'send_to': 'AW-' + conversion_id + '/' + conversion_label,
                'value': 1.00
            });
        }
    };

    adwordsConversion( 1053230267,"bRpeCJuYw_gCELuJnPYD"); // Display

    if ( existingOrNew === 'New') {
        adwordsConversion(1053230267, "EhujCKmdw_gCELuJnPYD"); // Nuevos display
    }

    adwordsConversion(961833097,"mLMyCKatwvgCEInR0coD"); // Grants

    const outbrainConversion = function(event) {
        if ( cookieTrackingManager.canItrack("advertisement") ){
            if (typeof(obApi) == "function") {
                obApi("track", event);
            }
        }
	};
    outbrainConversion("FIRMA");
    
    // TODO Implement enhanced conversion using Tiktok

    const tiktokConversion = function(eventName, details = {}){
        if (cookieTrackingManager.canItrack("advertisement")) {
            ttq.track(eventName, details);
        }
    };
    tiktokConversion("CompleteRegistration");

    if ( existingOrNew === "New"){
        tiktokConversion("Subscribe");
    }

    const twitterConversion = function() {
        if ( typeof(twttr) == "object" && typeof(twttr.conversion.trackPid) == "function" && cookieTrackingManager.canItrack("advertisement") ) {
            twq('event', 'tw-nx9ab-ockx6', {
            });
        }
    };
    twitterConversion();

});

/**
 * On form does not submit to Hubspot
 */
document.addEventListener('form:error', function (e) {
    gtag("event", "exception", {
        "description": "Could not send to Hubspot",
        'fatal': false
    });
});

/**
 * If the page can track ads, fire Outbrain 15 segs after loading
 */
document.addEventListener("DOMContentLoaded", function () { 
    if (document.location.href.includes("descarga") && cookieTrackingManager.canItrack('advertisement')){
        setTimeout(()=>{
            obApi('track', "15 sec on site");
         }, 15000);
    }
 });

/**
 * Fire Outbrain 15 sec after cookie acceptance
 */
const delayedOutbrain = function(){
    setTimeout(()=>{ 
        if (cookieTrackingManager.canItrack('advertisement')){
            obApi('track', "15 sec on site");
        }
    }, 15000);
};

/**
 * On cookies accept
 */
 document.addEventListener('cookies:accept', function (e) {
    gtag('event', 'Click', {
        'event_label': 'Accept',
        'event_category': 'CookiePrivacy',
        'non_interaction': true
    });
    if ( document.location.href.includes("descarga") ){
        delayedOutbrain();
    }
});

/**
 * On cookies config
 */
 document.addEventListener('cookies:config', function (e) {
    gtag('event', 'Click', {
        'event_label': 'Config',
        'event_category': 'CookiePrivacy',
        'non_interaction': true
    });

});

/**
 * On cookies check policy
 */
 document.addEventListener('cookies:checkpolicy', function (e) {
    gtag('event', 'Click', {
        'event_label': 'Check Policy',
        'event_category': 'CookiePrivacy',
        'non_interaction': true
    });
});

/**
 * On cookies accept all
 */
 document.addEventListener('cookies:acceptall', function (e) {
    gtag('event', 'Click', {
        'event_label': 'Accept all',
        'event_category': 'CookiePrivacy',
        'non_interaction': true
    });
    if ( document.location.href.includes("descarga") ){
        delayedOutbrain();
    }
});

/**
 * On cookies deny all
 */
 document.addEventListener('cookies:denytall', function (e) {
    gtag('event', 'Click', {
        'event_label': 'Deny all',
        'event_category': 'CookiePrivacy',
        'non_interaction': true
    });
});

/**
 * On cookies OK
 */
 document.addEventListener('cookies:ok', function (e) {
    gtag('event', 'Click', {
        'event_label': 'OK ' + String(cookieTrackingManager.consent.cats.analytics) + ',' + String(cookieTrackingManager.consent.cats.segmentation) + ',' + String(cookieTrackingManager.consent.cats.advertisement),
        'event_category': 'CookiePrivacy',
        'non_interaction': true
    });
    if ( document.location.href.includes("descarga") ){
        delayedOutbrain();
    }
});

/**
 * On clics in thank you buttons
 */
 document.addEventListener('thankyou:buttons', function (e) {

    const clickedButton = e.detail.button;

    gtag("event", "Click", {
        'event_category': "Autoconsumo",
        'event_label': clickedButton,
        'value': 0
    });

});

/**
 * On clics autoconsumo page
 */
document.addEventListener('autoconsumo:buttons', function (e) {

    const clickedButton = e.detail.button;

    gtag("event", "Click", {
        'event_category': "Autoconsumo",
        'event_label': clickedButton,
        'value': 0
    });

});
