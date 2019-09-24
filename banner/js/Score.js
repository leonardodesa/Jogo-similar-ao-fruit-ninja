
function Score() {
    this.score = 0;
    this.ponts = 10;
    this.sumPonts = 0;
    this.elementStart = document.getElementById('points');
    this.elementEnd = document.getElementById('points-end');
}

Score.prototype = {
    increaseScore: function(widthPuff) {
        var arraySizePuffs = [50, 60, 70, 80];
        
        if(widthPuff == 50) {
            this.ponts = 40;
        } else if(widthPuff == 60) {
            this.ponts = 30;
        } else if(widthPuff == 70) {
            this.ponts = 20;
        } else {
            this.ponts = 10;
        }
        
        this.sumPonts += this.ponts;
        this.elementStart.innerHTML = this.sumPonts; 
        this.elementEnd.innerHTML = this.sumPonts; 
    }
}