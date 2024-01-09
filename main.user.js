// ==UserScript==
// @name         Forget For You
// @version      1.1
// @description  Removes the "For You" feed whenever you view a YouTube channel.
// @author       Gr8Potato
// @namespace    https://github.com/Gr8Potato/Forget-For-You
// @match        https://www.youtube.com/*
// ==/UserScript==

(function() {
    'use strict';

    const targetUrlPattern = /^https:\/\/www\.youtube\.com\/@[^\/]+(\/featured)?$/;
    let lastUrl = location.href;

    const removeForYouContainer = function() {
        let contentsDivs = document.querySelectorAll('[id="contents"]');
        contentsDivs.forEach(div => {
            if (div === contentsDivs[0]){ return; }
            let titleSpan = div.querySelector('span#title');
            if (titleSpan && titleSpan.textContent.includes("For You")) {
                div.style.display = 'none'; // Hide this container
            }
        });
    };

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeForYouContainer();
            }
        });
    });

    const startObserver = function() {
        if (targetUrlPattern.test(window.location.href)) {
            observer.observe(document.body, { childList: true, subtree: true });
        }
    };

    const handleUrlChange = function() {
        const currentUrl = location.href;
        if (currentUrl !== lastUrl) {
            lastUrl = currentUrl;
            if (targetUrlPattern.test(currentUrl)) {
                window.location.reload();
            }
        }
    };

    setInterval(handleUrlChange, 250);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startObserver);
    } else {
        startObserver();
    }

})();
