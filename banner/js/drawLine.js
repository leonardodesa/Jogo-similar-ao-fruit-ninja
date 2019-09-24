
function DrawLine() {
}

DrawLine.prototype = {
    render: function() {
        var lw = 7;
        
        for(var i = 1; i < mouse_history.length; i++){
            ctx.save();
            ctx.globalCompositeOperation = 'screen';
            ctx.beginPath();
            ctx.lineWidth = lw;
            ctx.shadowBlur = 15;
            ctx.shadowColor= '#00c7ff'; 
            ctx.shadowOffsetY = 10;
            ctx.strokeStyle = 'white';
            ctx.moveTo(mouse_history[i][0], mouse_history[i][1]);
            ctx.lineTo(mouse_history[i-1][0], mouse_history[i-1][1]);
            ctx.stroke();
            ctx.restore();
            
            lw -= 0.30;
        } 
    },
    
    update: function() {
        
    }
}

