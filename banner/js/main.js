
var Premium = Premium || {};

var HEIGHTSCROLLBAR = 20;
var WIDTH = window.top.innerWidth;
var HEIGHT = window.top.innerHeight + (HEIGHTSCROLLBAR * 2);
var FPS = 30;
var TIMECREATEPUFFS = 500;

var ctaClick = document.getElementById('cta-click-para-jugar');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var gameStart = false;

var images, allImages = 0, uploadedImages = 0;

var loop, puffs, interaction, createElementDom, drawLine;

function loadElements() {
    resizeCanvas();
    loadImages();
    loadSound();
}

function loadImages() {
    images = {
        puff: 'assets/puff.png',
        puffExplosionLeft: 'assets/puff-left.png',
        puffExplosionRight: 'assets/puff-right.png'
    }

    for (var i in images) {
        var img = new Image();
        img.src = images[i];
        img.onload = loading;
        allImages++;
        images[i] = img;
    }

}

function loading() {
    uploadedImages++;

    if (allImages == uploadedImages) {
        createObjects();
    }
}

function createObjects() {
    loop = new Loop(ctx);
    score = new Score();
    time = new Time();
    drawLine = new DrawLine();
    interaction = new Interaction(canvas);
}

function startGame() {
    if (!gameStart) {
        startGame = true;

        removeFrameStart();
        addFrameGame();

        createPuffs();

        loop.createSprite(drawLine);
        interaction.addEventListener();

        loop.startLoop();
        time.decrementTime();
    }
}

function loadSound() {
    createjs.Sound.registerSound("assets/byte.mp3", "sound");
}

function playSound() {
    var instance = createjs.Sound.play("sound");
    instance.duration = 500;
    instance.volume = 0.5;
}

function removeFrameStart() {
    TweenMax.to(['#start-frame', '#ricolino-logo-container'], .6, {
        opacity: 0, ease: Power2.easeIn, onComplete: function () {
            TweenMax.set(['#start-frame', '#ricolino-logo-container'], { display: 'none' });
        }
    });
}

function addFrameGame() {
    TweenMax.to('#frame-game-start', .6, { opacity: 1, ease: Power2.easeOut, delay: .6 });
}

function gameOver() {

    removeAddPuff();

    playAnimationEndFrame();

    setTimeout(function () {
        loop.stopLoop();
    }, 4000);

}

function removeAddPuff() {
    loop.processGeneral[0].loopObject.deleteProcess(loop.processGeneral[0]);
}

function playAnimationEndFrame() {
    hiddenFrameStart();

    frameFinalAnimation();
}

function hiddenFrameStart() {
    TweenMax.to('#container-time-points-start', .6, { opacity: 0, ease: Power2.easeIn });
}

function frameInstructionAnimation() {
    var instructionAnima = new TimelineMax();

    instructionAnima
        .to("#f1-hand-icon", .8, { opacity: 1, ease: Power2.easeOut }, 'start' + '+=1')
        .fromTo("#f1-hand-icon", 2, { x: '-80%', rotation: '0deg' }, { x: '50%', rotation: '75deg', yoyo: true, repeat: -1, ease: Power1.easeInOut }, 'start' + '+=.8')
        .to("#f1-hand-txt", .8, { opacity: 1, scale: 1, ease: Back.easeOut.config(2) }, 'start' + '+=1.2')
}

function frameFinalAnimation() {
    var finalFrame = new TimelineMax();

    finalFrame
        .set('#frame-game-over', { display: 'block', opacity: 1 })
        .to('#txt-end-time', .4, { opacity: 1, scale: 1, x: '-50%', ease: Power2.easeIn }, 'start' + '+=.5')
        .to('#container-points-end', .4, { opacity: 1, scale: 1, y: '-50%', x: '-50%', ease: Power2.easeIn }, 'start' + '+=.7')
        .to('#frame-game-over', .6, { opacity: 0, ease: Power2.easeIn }, 'start' + '+=3.1')

        .to("#logo-kranky", .6, { opacity: 1, scale:1, display: 'block', ease: Power2.easeOut }, 'start' + '+=3.6')

        .to('#end-frame', .6, { display: 'block', opacity: 1, ease: Power2.easeOut }, 'start' + '+=3.5')
        .to("#text-nuevo", .5, { opacity: 1, x: '0%', y: '0%', ease: Power2.easeOut }, 'start' + '+=3.5')
        .to("#product1", .7, { opacity: 1, scale: 1, ease: Back.easeOut.config(2) }, 'start' + '+=3.7')
        .staggerTo(".puff", 1, { opacity: 1, scale: 1, x:'0%', y:'0%', rotation:0, ease: Power2.easeOut }, .2, 'start' + '+=3.8')
        .to("#f2-cta-wrap", .7, { scaleX: 1, rotationZ: '0.01deg', ease: Power2.easeOut }, 'start' + '+=4')
        .to("#f2-cta-text", .7, { opacity: 1, ease: Power2.easeOut }, 'start' + '+=4.5')
}

function createPuffs() {

    var newPuff = {
        lastTimePuff: new Date().getTime(),

        process: function () {
            var nowTime = new Date().getTime();
            var pastTime = nowTime - this.lastTimePuff;

            if (pastTime >= TIMECREATEPUFFS) {
                newPuffObject();
                this.lastTimePuff = nowTime;
            }
        }
    }
    loop.addProcessGeneral(newPuff);
}

function newPuffObject() {
    puffs = new Puffs(ctx, images.puff, images.puffExplosionLeft, images.puffExplosionRight);

    var arraySizePuffs = [50, 60, 70, 80];
    var positionArraySizePuffs = randomNumber(0, arraySizePuffs.length - 1);

    puffs.setWidth(arraySizePuffs[positionArraySizePuffs]);
    puffs.setHeight(puffs.width);

    puffs.setVelocityY(randomNumber(18, 20));

    var velocityX = [-1, 1, 2, -2];
    var numberPositionArray = randomNumber(0, 3);
    puffs.setVelocityX(velocityX[numberPositionArray]);

    if (velocityX < 0) {
        puffs.setPositionX(randomNumber((WIDTH / 2) + puffs.width, (WIDTH / 2) + (puffs.width / 2)));
    } else {
        puffs.setPositionX(randomNumber((WIDTH / 2) - puffs.width, (WIDTH / 2) - (puffs.width / 2)));
    }
    puffs.setPositionY(HEIGHT);

    puffs.setMaxPositionY(HEIGHT * 1 / 1.5);

    loop.createSprite(puffs);
}

function randomNumber(min, max) {
    var number = Math.floor(min + Math.random() * (max - min + 1));
    return number;
}

function resizeCanvas() {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
}

ctaClick.addEventListener('click', function () {
    startGame();
    frameInstructionAnimation();
});
window.document.addEventListener('DOMContentLoaded', loadElements);
window.addEventListener('resize', resizeCanvas, false);
window.addEventListener('scroll', resizeCanvas, false);

setTimeout(function () {
    resizeCanvas();
}, 600);


