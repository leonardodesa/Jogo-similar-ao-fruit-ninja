
function CreateElementDom() {
    this.elementCreated;
    this.classTxtKrank = 'txt-krank';
    this.srcTxtKrank = 'assets/txt-krank.png';
    this.classMorona = 'morona';
    this.srcMorona = 'assets/morona.png';
    this.elementAppendDiv = document.getElementById('container');
}

CreateElementDom.prototype = {

    createDiv: function(width, x, y) {
        var containerDiv = document.createElement('div');
        containerDiv.style.position = 'absolute';
        containerDiv.style.top = y + 'px';
        containerDiv.style.left = x + 'px';
        containerDiv.style.width = width + 'px';

        var imgTxtKrank = document.createElement('img');
        imgTxtKrank.classList = this.classTxtKrank;
        imgTxtKrank.src = this.srcTxtKrank;
        
        var imgMorona = document.createElement('img');
        imgMorona.classList = this.classMorona;
        imgMorona.src = this.srcMorona;

        containerDiv.appendChild(imgTxtKrank);
        containerDiv.appendChild(imgMorona);
        this.elementCreated = containerDiv;

        this.elementAppendDiv.appendChild(containerDiv);

        this.deleteDiv(containerDiv);
    },

    deleteDiv: function(containerDiv) {
        setTimeout(function(){
            containerDiv.remove(); 
        }, 600);
    },

    updateDiv: function(x, y) {
        if(this.elementCreated) {
            this.elementCreated.style.left = x + 'px';
            this.elementCreated.style.top = y + 'px';
        }
    }
}