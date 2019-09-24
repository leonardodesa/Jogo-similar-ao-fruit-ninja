function Time() {
    this.time = 20;
    this.element = document.getElementById('time');
    this.endTime = false;
}

Time.prototype = {

    decrementTime: function () {
        this.time--;
        this.element.innerHTML = this.time;

        this.endGame();

        if (!this.endTime) {
            var decrement = this;
            setTimeout(function () {
                decrement.decrementTime();
            }, 1000);
        }
    },

    endGame: function () {
        if (this.time <= 0) {
            this.endTime = true;
            this.exitTextHandInteraction();
            gameOver();
        }
    },
    exitTextHandInteraction: function () {
        TweenMax.to("#f1-hand-container", .4, {
            opacity: 0, scale: 0.8, ease: Power2.easeIn, onComplete: function () {
                TweenMax.set(this.target, { display: 'none' });
            }
        });
    }
}