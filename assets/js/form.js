/* eslint-disable no-undef */
/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* jshint esversion:8 */

/* FORM FUNCIONS */

/**
 * Parse the utms and Adwords gclid
 * @returns {object}
 */
async function stringParams() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let paramsObj = {};

    paramsObj.utm_medium = urlParams.has('utm_medium') ? urlParams.get('utm_medium') : '';
    paramsObj.utm_source = urlParams.has('utm_source') ? urlParams.get('utm_source') : '';
    paramsObj.utm_campaign = urlParams.has('utm_campaign') ? urlParams.get('utm_campaign') : '';
    paramsObj.utm_content = urlParams.has('utm_content') ? urlParams.get('utm_content') : '';
    paramsObj.utm_term = urlParams.has('utm_term') ? urlParams.get('utm_term') : '';
    paramsObj.gclid = urlParams.has('gclid') ? urlParams.get('gclid') : '';
    paramsObj.adgroup = urlParams.has('hsa_grp') ? urlParams.get('hsa_grp') : '';
    paramsObj.campaign = urlParams.has('hsa_cam') ? urlParams.get('hsa_cam') : '';

    if ( paramsObj.gclid !== "" && paramsObj.utm_medium === "") {
        paramsObj.utm_medium = "ppc";
    }

    if ( paramsObj.gclid !== "" && paramsObj.utm_source === "") {
        paramsObj.utm_source = "adwords";
    }

    if ( paramsObj.gclid !== "" && paramsObj.utm_campaign === "") {
        paramsObj.utm_campaign = "FrutaTemporada";
    }

    if ( ["adwords", "google"].includes(paramsObj.utm_source) && ["ppc", "cpc"].includes(paramsObj.utm_medium) ) {

        const rawResponse = await fetch("https://apis.greenpeace.es/hubspot-urls/?" + new URLSearchParams({
            adgroup: paramsObj.adgroup,
            campaign: paramsObj.campaign
        }), {
            method: "GET",
            mode: "cors"
        });

        const jsonResponse = await rawResponse.json();
        if ( typeof(jsonResponse.campaign_name) === "string" ) {
            paramsObj.utm_content = jsonResponse.campaign_name;
        } else {
            gtag('event', 'exception', {
                'description': 'Unknown Adwords campaign number' + paramsObj.campaign,
                'fatal': false
            });
        }
        if ( typeof(jsonResponse.group_name) === "string" ) {
            paramsObj.utm_term = jsonResponse.group_name;
        } else {
            gtag('event', 'exception', {
                'description': 'Unknown Adwords ad group number' + paramsObj.adgroup,
                'fatal': false
            });
        }
    }

    return paramsObj;
}

/**
 * Read a cookie
 * @param {string} cookieString 
 * @returns {string}
 */
const cookie_read = function (cookieString) {
    var t;
    // eslint-disable-next-line no-cond-assign
    return (t = (new RegExp("(?:^|; )" + encodeURIComponent(cookieString) + "=([^;]*)")).exec(document.cookie)) ? t[1] : null;
};

/**
 * Is valid email
 * @param {string} email 
 * @returns {boolean}
 */
const isValidEmail = function (email) {
    email = email.trim();
    // eslint-disable-next-line no-control-regex
    const valid_email = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gmi.test(email);
    return valid_email;
};

/**
 * Is valid Spanish phone number
 * @param {string} phone 
 * @returns {boolean}
 */
const isValidPhone = function (phone) {
    phone = phone.trim();
    phone = phone.replace(/[\.\s-,_\|#]/g, '');
    return /^[6789]\d{8}$/.test(phone);
};

/**
 * Is valid Spanish ID number
 * @param {string} id_number 
 * @returns {boolean}
 */
const isValidIdNumber = function (id_number) {
    id_number = id_number.replace(/[\.\s-,_\|#]/g, '');
    if (validatesDniNifCif(id_number) === 1 || validatesDniNifCif(id_number) === 3) {
        return true;
    }
    return false;
};

const str_replace = function (e, t, n) {
    var j;
    var r = e,
        i = t,
        s = n;
    var o = i instanceof Array,
        u = s instanceof Array;
    r = [].concat(r);
    i = [].concat(i);
    var a = (s = [].concat(s)).length;
    while (j = 0, a--) {
        if (s[a]) {
            // eslint-disable-next-line no-empty
            while (s[a] = s[a].split(r[j]).join(o ? i[j] || "" : i[0]), ++j in r) {}
        }
    }
    return u ? s : s[0];
};

/**
 * Identifies if string is a NIE, NIF or CIF (Spain)
 * @param {string} value 
 * @returns {number}
 */
const validatesDniNifCif = function (value) {
    var j, posicion, letra, suma, i, temp1, temp2, n, pos;
    var a = value.replace(/[\.\s-,_\|#]/g, '').toUpperCase();
    var temp = value.replace(/[\.\s-,_\|#]/g, '').toUpperCase();
    var cadenadni = "TRWAGMYFPDXBNJZSQVHLCKE";
    if (temp !== '') {
        if ((!/^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$/.test(temp) && !/^[T]{1}[A-Z0-9]{8}$/.test(temp)) && !/^[0-9]{8}[A-Z]{1}$/.test(temp)) {
            return 0;
        }
        if (/^[0-9]{8}[A-Z]{1}$/.test(temp)) {
            posicion = a.substring(8, 0) % 23;
            letra = cadenadni.charAt(posicion);
            var letradni = temp.charAt(8);
            if (letra == letradni) {
                return 1;
            } else {
                return -1;
            }
        }
        suma = parseInt(a[2]) + parseInt(a[4]) + parseInt(a[6]);
        for (i = 1; i < 8; i += 2) {
            temp1 = 2 * parseInt(a[i]);
            temp1 += '';
            temp1 = temp1.substring(0, 1);
            temp2 = 2 * parseInt(a[i]);
            temp2 += '';
            temp2 = temp2.substring(1, 2);
            if (temp2 === '') {
                temp2 = '0';
            }
            suma += (parseInt(temp1) + parseInt(temp2));
        }
        suma += '';
        n = 10 - parseInt(suma.substring(suma.length - 1, suma.length));
        if (/^[KLM]{1}/.test(temp)) {
            if (a[8] == String.fromCharCode(64 + n)) {
                return 1;
            } else {
                return -1;
            }
        }
        if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(temp)) {
            temp = n + '';
            if (a[8] == String.fromCharCode(64 + n) || a[8] == parseInt(temp.substring(temp.length - 1, temp.length))) {
                return 2;
            } else {
                return -2;
            }
        }
        if (/^[T]{1}/.test(temp)) {
            if (a[8] == /^[T]{1}[A-Z0-9]{8}$/.test(temp)) {
                return 3;
            } else {
                return -3;
            }
        }
        if (/^[XYZ]{1}/.test(temp)) {
            pos = str_replace(['X', 'Y', 'Z'], ['0', '1', '2'], temp).substring(0, 8) % 23;
            if (a[8] == cadenadni.substring(pos, pos + 1)) {
                return 3;
            } else {
                return -3;
            }
        }
    }
    return 0;
};

/**
 * Delay
 * @param {number} ms 
 * @returns 
 */
const delay = ms => new Promise(res => setTimeout(res, ms));

document.addEventListener('alpine:init', () => {

    Alpine.store('fname', '');
    
    Alpine.store('scrollButton', true);

    let buttonIsShown = true;

    addEventListener('scroll', (event) => {
        const windowHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        // const contenido2 = jQuery("#rightMaincontainer").offset();
        const rect = document.querySelector("#signup").getBoundingClientRect();
        const offset = { 
            top: rect.top + window.scrollY, 
            left: rect.left + window.scrollX, 
        };
        // console.log( (offset.top - windowHeight) < 700 );
        if ( (offset.top - windowHeight) < 700 && buttonIsShown === true ) {
            console.log("Hide button");
            buttonIsShown = false;
            Alpine.store('scrollButton', false);
        }
    });
});

