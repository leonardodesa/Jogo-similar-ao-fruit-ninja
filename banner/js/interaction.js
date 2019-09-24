
var mouse_history = [];

function Interaction(elementAddEvent) {
    this.elementAddEvent = elementAddEvent;
    this.currentX = 0;
    this.currentY = 0;
    this.input = [];
    this.sprites = [];
    this.deleteSprites = [];
    this.exitText = false;
}

Interaction.prototype = {

    addEventListener: function () {
        var object = this;

        this.elementAddEvent.addEventListener("touchmove", function (e) {
            object.drag(e, object);
            object.trailMouseCordinates(e);
        }, false);

        this.elementAddEvent.addEventListener("touchstart", function (e) {
            object.drag(e, object);
        }, false);

        this.elementAddEvent.addEventListener("touchend", function (e) {
            object.drag(e, object);
            object.removeTrailMouseCordinates(e);
        }, false);

    },

    drag: function (e, object) {

        if (!this.exitText) {
            this.exitTextHandInteraction();
            this.exitText = true;
        }

        if (e) {
            e.preventDefault();

            if (e.type === "touchmove") {
                this.currentX = e.touches[0].clientX;
                this.currentY = e.touches[0].clientY;
            } else {
                this.currentX = e.clientX;
                this.currentY = e.clientY;
            }

            this.input = [this.currentX, this.currentY];

            object.checkCollision();
        }
    },

    exitTextHandInteraction: function () {
        TweenMax.to("#f1-hand-container", .4, {
            opacity: 0, scale: 0.8, ease: Power2.easeIn, onComplete: function () {
                TweenMax.set(this.target, { display: 'none' });
            }
        });
    },

    trailMouseCordinates: function (e) {
        if (mouse_history.length > 20) {
            mouse_history.length = 20;
            mouse_history.unshift([e.touches[0].clientX, e.touches[0].clientY]);
        } else {
            mouse_history.push([e.touches[0].clientX, e.touches[0].clientY]);
        }
    },

    removeTrailMouseCordinates: function (e) {
        for (var i = 0; i < mouse_history.length; i++) {
            setTimeout(function () {
                mouse_history.shift();
            }, 20 * i);
        }
    },

    checkCollision: function () {
        for (var i = 0; i < loop.sprites.length; i++) {
            if (loop.sprites[i].x + loop.sprites[i].width >= this.input[0] && loop.sprites[i].x < this.input[0] &&
                loop.sprites[i].y + loop.sprites[i].height > this.input[1] && loop.sprites[i].y < this.input[1]) {
                loop.sprites[i].collision = true;
            }
        }
    }

}
