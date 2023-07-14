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

const enter = function (element, animation) {
    const el = document.querySelector(element);
    if (el.hasAttribute("hidden")) {
        el.removeAttribute("hidden");
        animateCSS(element, animation).then((message) => {
            // Follow up
        });
    }
};
const leave = function (element, animation) {
    const el = document.querySelector(element);
    if (!el.hasAttribute("hidden")) {
        animateCSS(element, animation).then((message) => {
            // Follow up
            el.setAttribute("hidden", "hidden");
        });
    }
};
