class Jogador extends Elemento {
    constructor(x, y, sprite){
        super(x, y, sprite);
        this.pulando = false;
        this.andando = false;
        this.imune = false;
        this.imuneTempo = 0;
    }   
}