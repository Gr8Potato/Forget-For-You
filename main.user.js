// ==UserScript==
// @name         Forget For You
// @version      1.0
// @description  Removes the "For You" feed whenever you view a YouTube channel.
// @author       Gr8Potato
// @namespace    https://github.com/Gr8Potato/Forget-For-You
// @include      https://www.youtube.com/@*
// @include      https://www.youtube.com/@*/featured
// ==/UserScript==

(function() {
    'use strict';

    if (!/^https:\/\/www\.youtube\.com\/@[^\/]+(\/featured)?$/.test(window.location.href)) { //we want this to only work for youtube.com/@channel and .../@channel/featured, the latter is the uri which is returned when clicking "Home"
        return;
    }

    const removeSecondContentsDiv = function() {
        let contentsDivs = document.querySelectorAll('[id="contents"]');
        contentsDivs[4].style.display = 'none'; // targets specific element in the DOM
    };

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeSecondContentsDiv();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    removeSecondContentsDiv();
})();
