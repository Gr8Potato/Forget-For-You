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


    if (!/^https:\/\/www\.youtube\.com\/@[^\/]+(\/featured)?$/.test(window.location.href)) {
        return;
    }

    const removeForYouContainer = function() {
        let contentsDivs = document.querySelectorAll('[id="contents"]');
        contentsDivs.forEach(div => {
            // Check if this container has a span with the text "For You"
            if (div == contentsDivs[0]){return;}
            let titleSpan = div.querySelector('span#title');
            if (titleSpan && titleSpan.textContent.includes("For You")) {
                div.style.display = 'none'; // Hide this container
            }
        });
    };
    document.addEventListener('DOMContentLoaded', function() {
        removeForYouContainer();
    });

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                removeForYouContainer();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    removeForYouContainer();
})();
