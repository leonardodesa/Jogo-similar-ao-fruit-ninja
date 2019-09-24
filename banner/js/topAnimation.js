"use strict";
var Premium = Premium || {};

Premium.creative = {
    init: function () {
        
        var top = new TimelineMax({ paused: true, delay: 1 });
        
        top
        .addLabel('start')
        .staggerTo('.arrow-animation', .8 , { opacity:1, y:7, ease: Power2.easeOut, rotationZ:'0.01deg'}, -.2, 'start' + '+=.2')
        .to('.arrow-animation', .8, { y: 0, repeat: 20, yoyo: true, ease: Power2.easeInOut, rotationZ: '0.01deg' }, 'start' + '+=1.4')
        .to("#logo", .3, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Back.easeOut.config(2)}, 'start' + '+=.3')
        .to("#product", .3, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Back.easeOut.config(2) }, 'start' + '+=.4')
        .to("#text1", .3, { opacity: 1, scale: 1, rotationZ: '0.01deg', ease: Back.easeOut.config(2)}, 'start' + '+=.3')
        .to("#text2", .3, { opacity: 1, scale: 1, rotate: '0deg', rotationZ: '0.01deg', ease: Back.easeOut.config(2)}, 'start' + '+=.5')
        .to("#text3", .3, { opacity: 1, y: '0px', rotationZ: '0.01deg', ease: Power2.easeOut}, 'start' + '+=.7')
        .to("#text-nuevo", .3, { opacity: 1, x: '0%', rotationZ: '0.01deg', ease: Power2.easeOut}, 'start' + '+=.8')
        
        window.addEventListener("load", function () {
            top.play();
        });
    }
}