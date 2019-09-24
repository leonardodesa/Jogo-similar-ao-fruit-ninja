function Loop(context) {
    this.context = context;
    this.isLoop = false;
    this.sprites = [];
    this.deleteSprites = [];
    this.deleteProcessGeneral = [];
    this.processGeneral = [];
    this.lastTime = 0;
    this.pastTime = 0;
}

Loop.prototype = {
    
    createSprite: function(sprite) {
        this.sprites.push(sprite);
        sprite.loopObject = this;
    },
    
    startLoop: function() {
        this.isLoop = true;
        this.start();
    },
    
    stopLoop: function() {
        this.isLoop = false;
        this.start();
    },
    
    start: function() {
        
        if(this.isLoop) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if(this.sprites.length != 0) {
                for (var i in this.sprites) {
                    this.sprites[i].update();
                    this.sprites[i].render();
                }
            }

            if(this.processGeneral.length != 0) {
                for(var i in this.processGeneral) {
                    this.processGeneral[i].process();
                }
            }
            
            this.handlerSpritesDelete();
            
            var loopThis = this;
            window.requestAnimationFrame(function() {
                loopThis.start();
            }, 1000 / FPS);
        }
    },
    
    deleteSprite: function(sprite) {
        this.deleteSprites.push(sprite);
    },
    
    addProcessGeneral: function(processGeneral) {
        this.processGeneral.push(processGeneral);
        processGeneral.loopObject = this;
    },
    
    deleteProcess: function(sprite) {
        this.deleteProcessGeneral.push(sprite);
    },
    
    handlerSpritesDelete: function() {
        
        var newArraySprites = [];
        var newArrayProcessGeneral = [];
        
        for(var i in this.sprites) {
            if(this.deleteSprites.indexOf(this.sprites[i]) == -1) {                
                newArraySprites.push(this.sprites[i]);
            }
        }
        
        for(var i in this.processGeneral) {
            if(this.deleteProcessGeneral.indexOf(this.processGeneral[i]) == -1) {                
                newArrayProcessGeneral.push(this.processGeneral[i]);
            }
        }
        
        this.deleteSprites = [];
        this.deleteProcessGeneral = [];
        
        this.sprites = newArraySprites;
        this.processGeneral = newArrayProcessGeneral;
    }
}