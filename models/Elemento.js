class Elemento {
    constructor(x, y, sprite){
        this.x = x;
        this.y = y;
        this.sprite = sprite;
        this.orientaca = false;
    }

    colideCom(elem) {
        if (this.x < elem.x + elem.sprite.atual.width 
            && this.x + this.sprite.atual.width > this.x 
            && this.y < elem.y + elem.sprite.atual.height 
            && this.y + this.sprite.atual.height > elem.y) {
            return true;
        }
        return false;
    }

}