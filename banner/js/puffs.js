function Puffs(context, imagem, imagemExplosionLeft, imagemExplosionRight) {
    this.context = context    
    this.imagem = imagem;
    this.explosionLeft = imagemExplosionLeft;
    this.explosionRight = imagemExplosionRight;
    this.x = 0;
    this.y = 0;
    this.velocityX = 0;
    this.velocityY = 0;
    this.width = 0;
    this.height = 0;
    this.gravity = false;
    this.collision = false;
    this.endAnimation = false;
    this.maxPositionY = 0;
    this.rotate = 0;
    this.velocityRotate = 1;
}

Puffs.prototype = {
    
    update: function() {
        
        this.x += this.velocityX;
        this.y += ( - this.velocityY);

        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);

        this.slowDownVelocityPuff();
        
        this.increaseVelocityPuff();
        
        if(this.y > HEIGHT) {
            this.deletePuff();
        }
        
        if(this.collision && !this.endAnimation) {
            this.endAnimation = true;
            playSound();
            this.deletePuff();
            score.increaseScore(this.width);
            this.createNewPuff();
        }

        if(this.elementsShowCollision) {
            this.elementsShowCollision.updateDiv(this.x, this.y);
        }
    },
    
    createNewPuff: function() {
        var puffLeft = new Puffs(this.context, this.imagem, this.imagemExplosionLeft, this.imagemExplosionRight);
        var puffRight = new Puffs(this.context, this.imagem, this.imagemExplosionLeft, this.imagemExplosionRight);
        
        var velocityXPuffLeft = this.velocityX;
        
        if(velocityXPuffLeft > 0 || velocityXPuffLeft < 0) {
            velocityXPuffLeft *= -1; 
            if(velocityXPuffLeft >= 0) {
                velocityXPuffLeft += this.randomNumber(1, 2);
            } else {
                velocityXPuffLeft += this.randomNumber(-1, -2);
            }
        }
        
        puffLeft.x = this.x;
        puffLeft.y = this.y;
        puffLeft.setWidth(this.width);
        puffLeft.setHeight(this.width);
        puffLeft.setVelocityY(this.velocityY + this.randomNumber(1, 2));
        puffLeft.setVelocityX(velocityXPuffLeft);
        puffLeft.setMaxPositionY(this.maxPositionY);
        puffLeft.gravity = this.gravity;
        puffLeft.collision = this.collision;
        puffLeft.endAnimation = this.endAnimation;
        puffLeft.imagem = this.explosionRight;
        puffLeft.velocityRotate = this.randomNumber(-6, 6);
        puffLeft.rotate = - this.rotate;
        puffLeft.elementsShowCollision = new CreateElementDom(); 
        puffLeft.elementsShowCollision.createDiv(puffLeft.width, puffLeft.x, puffLeft.y + puffLeft.width);
        
        puffRight.x = this.x;
        puffRight.y = this.y;
        puffRight.setWidth(this.width);
        puffRight.setHeight(this.width);
        puffRight.setVelocityY(this.velocityY);
        puffRight.setVelocityX(this.velocityX);
        puffRight.setMaxPositionY(this.maxPositionY);
        puffRight.gravity = this.gravity;
        puffRight.collision = this.collision;
        puffRight.endAnimation = this.endAnimation;
        puffRight.velocityRotate = this.randomNumber(-6, 6);
        puffRight.rotate = this.rotate;
        puffRight.imagem = this.explosionLeft;
        
        loop.createSprite(puffLeft);
        loop.createSprite(puffRight);
    },
    
    deletePuff: function() {
        this.deleteSprite = true;
        loop.deleteSprite(this);
    },
    
    slowDownVelocityPuff: function() {
        this.velocityY -= .4;
    },
    
    increaseVelocityPuff: function() {
        if(Math.round(this.velocityY) == 0) {
            this.gravity = true;
        }
        
        if(this.gravity) {
            this.velocityY -= .5;
        }
    },
    
    render: function() {
        this.rotatePuff();
    },
    
    rotatePuff: function() {
        var ctx = this.context;
        var imagem = this.imagem;
        this.rotate += this.velocityRotate * Math.PI / 180; 
        
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotate);
        ctx.drawImage(imagem, this.width / - 2, this.height / - 2, this.width, this.height); 
        
        ctx.restore();
    },

    randomNumber: function(min, max) {
        var number = Math.floor(min + Math.random() * (max - min + 1));
        if(number == 0) this.randomNumber(min, max);
        return number;
    },
    
    setVelocityX: function(velocity) {
        this.velocityX = velocity;
    },
    
    setVelocityY: function(velocity) {
        this.velocityY = velocity;
        this.auxVelocityY = velocity;
    },
    
    setPositionX: function(position) {
        this.x = position;
    },
    
    setPositionY: function(position) {
        this.y = position;
    },
    
    setWidth: function(width) {
        this.width = width;
    },
    
    setHeight: function(height) {
        this.height = height;
    },
    
    setMaxPositionY: function(maxPositionY) {
        this.maxPositionY = maxPositionY;
    }
}
