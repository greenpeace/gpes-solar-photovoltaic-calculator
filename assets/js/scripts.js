/* eslint-disable no-unused-vars */
/* jshint esversion: 6*/

/**
 * Animate.css animation
 * @param {string}} element
 * @param {string} animation
 * @param {string} [prefix='animate__']
 * @returns {*}
 */
const animateCSS = (element, animation, prefix = 'animate__') =>
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);
        node.classList.add(`${prefix}animated`, animationName);
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve('Animation ended');
        }
        node.addEventListener('animationend', handleAnimationEnd, { once: true });
    });

/**
 * Enter animation
 * @param {string} element
 * @param {string} animation
 */
const enter = function (element, animation, background = true) {
    const el = document.querySelector(element);
    if (el.hasAttribute("hidden")) {
        el.removeAttribute("hidden");
        if (background === true && document.querySelector("header")) {
             document.querySelector("header").classList.add("no-background");
        }
        // animateCSS(element, animation).then((message) => {
        //     // Follow up
        // });
    }
};

/**
 * Leave animation
 * @param {string} element
 * @param {string} animation
 */
const leave = function (element, animation, background = true) {
    const el = document.querySelector(element);
    if (!el.hasAttribute("hidden")) {
        if (background === true && document.querySelector("header")) {
             document.querySelector("header").classList.remove("no-background");
        }
        // animateCSS(element, animation).then((message) => {
            // Follow up
            el.setAttribute("hidden", "hidden");
        // });
    }
};

/**
 * Scroll to a specific id
 * @param {string} id 
 */
const flyTo = function (id, delay = 200) {
    setTimeout(function () {
        document.getElementById(id).scrollIntoView({
            behavior: "smooth"
        });
    }, delay);
};

/**
 * Not function for Alpine
 * @param {boolean} value 
 * @returns {string}
 */
const not = function (value) {
    if (value) {
        return "false";
    } else {
        return "true";
    }
};


/**
 * Trigger an event with an ID
 * @param {string} elementID 
 * @param {string} event 
 * @param {object} detailObject 
 */
const trigger = function(elementID, event, detailObject){
    let cEvent = new CustomEvent(event, {
        detail : detailObject,
        bubbles: true,
        cancelable: true,
        composed: false
    });

    const element = document.getElementById(elementID);
    element.dispatchEvent(cEvent);
};