"use strict";
var Premium = Premium || {};

Premium.creative = {
    init: function () {

        var creative = window.top.document.getElementsByClassName("jpx-mt-ad")[0];
        var play = false;
        var main = new TimelineMax({ paused: false });
        var percentVisible;

        main
            .addLabel('start')
            .to(".scale-anima", .3, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Back.easeOut.config(2) }, 'start' + '+=.3')
            .to("#text1", .3, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Back.easeOut.config(2) }, 'start' + '+=.5')
            .to("#text2", .3, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Back.easeOut.config(2) }, 'start' + '+=.6')
            .to("#text3", .3, { opacity: 1, y: '0px', rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.7')
            .to("#cta-click-para-jugar", .7, { scaleX: 1, rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=.9')
            .to("#f1-cta-text", .7, { opacity: 1, ease: Power2.easeOut }, 'start' + '+=1.4')

        function scrollHandler() {
            percentVisible = getPercentageVisibility();
            if (percentVisible > 80 && !play) {
                play = true;
                main.play();
            }
        }

        function getPercentageVisibility() {
            var creativeHeight = creative.offsetHeight;
            var topBarRect = window.top.document.getElementsByClassName("jpx-mt-strip-label")[2].getBoundingClientRect();
            var bottomBarRect = window.top.document.getElementsByClassName("jpx-mt-strip-label")[1].getBoundingClientRect();
            var dist = bottomBarRect.top - topBarRect.bottom;
            return dist < 0 ? 0 : Math.round(dist / creativeHeight * 100);
        }

        (window.top.document.getElementById("scrollEl") ||
            window.top).addEventListener("scroll", scrollHandler);
    }
}