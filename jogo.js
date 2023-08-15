var tela = 0;
var jogador;
var jogadorAD, jogadorAE, jogadorD, jogadorE;
var jogadorPulandoD, jogadorPulandoE;
var velocidade_y = 0;
var gravidade = 1.5;

var abelha, abe_x, abe_y, abelha_ori = false; 
var abelhaE, abelhaD;

var spriteRato = new Sprite(null, true, null, null, null, null);
var novoRato = new Elemento(20, 257, spriteRato);

var spriteJogador = new Sprite(null, false, null, null, null, null);
var novoJogador = new Jogador(0, 0, spriteJogador);

var parede_direita, parede_esqueda;
var anima_cont = 0;
var trig_cont = 0;
var dificuldade = [[8, 3, 2], [6, 2, 3], [4, 1, 4]];
var dif_atual;
var pulos, vidas, pontos = 0;
var vida_imune, imune_cont = 0;
var fundo, piso, plataforma;

let jogadr = {
    vidas: 0,
    pulos: 0,
    pontos: 0,
    x: 10,
    y: 370,
    orientacao: true,
    imgAtual: null,
    img: {
        andandoDireita: null,
        andandoEquerda: null,
        paradoDireita: null,
        paradoEsquerda: null,
        pulandoDireita: null,
        pulandoEsquerda: null
        
    },
    loadImagens: () => {
        jogadr.img.andandoDireita = loadImage("imagens/jogador/jogadorAD.png");
        jogadr.img.andandoEquerda = loadImage("imagens/jogador/jogadorAE.png");
        jogadr.img.paradoDireita = loadImage("imagens/jogador/jogadorD.png");
        jogadr.img.paradoEsquerda = loadImage("imagens/jogador/jogadorE.png");
        jogadr.img.pulandoDireita = loadImage("imagens/jogador/jogadorPulandoD.png");
        jogadr.img.pulandoEsquerda = loadImage("imagens/jogador/jogadorPulandoE.png");
    }
}

let jogo = []

jogo = {
    imagens: {
        fundo: null,
        piso: null,
        plataforma: null,
        moeda: null,
        joiaAzul: null,
        vida: null,
    },
    sons: {
        perdeVida: null,
        pulo: null,
        pegaMoeda: null
    }
};

var moeda_img, vida_img;

var joia_azul, joia_ativa = true;
var bandeira, bandeira_baixa, bandeira_levantada, bandeira_ativa = false;

var moedas_x = [70, 120, 170, 220, 265, 600, 650, 700, 750, 800, 940, 940];
var moedas_y = [170, 135, 110, 135, 170, 430, 430, 430, 430, 430, 250, 300];
var moeda_ativa = [true, true, true, true, true, true, true, true, true, true, true, true];

function colisao_jogador(objeto, x, y) {
    if (novoJogador.x < x + objeto.width && novoJogador.x + jogador.width > x &&
        novoJogador.y < y + objeto.height && novoJogador.y + jogador.height > y) {
        return true;
    }
    return false;
}

function inicia_jogo(dif) {
    vidas = dificuldade[dif][1];
    pulos = dificuldade[dif][0];
    dif_atual = dif;
    pontos = 0;
    novoJogador.x = 10;
    novoJogador.y = 370;
    novoJogador.orientacao = true;
    for (i = 0; i < moeda_ativa.length; i++) moeda_ativa[i] = true;
    joia_ativa = true;
    bandeira_ativa = false;
    tela = 1;
}

function keyPressed() {
    if (tela > 1 && keyCode === 32) tela = 0;

    if ((keyCode === UP_ARROW || keyCode === 32) && (!novoJogador.pulando) && pulos > 0) {
        pulos -= 1;
        jogo.sons.pulo.play();
        velocidade_y = -26;
        novoJogador.pulando = true;
    }
}

function preload() {
    jogo.imagens.fundo = loadImage("imagens/fundo.png");
    jogo.imagens.piso = loadImage("imagens/piso.png");
    jogo.imagens.plataforma = loadImage("imagens/plataforma.png");

    jogadr.loadImagens();

    jogadorAD = loadImage("imagens/jogador/jogadorAD.png");
    jogadorAE = loadImage("imagens/jogador/jogadorAE.png");
    jogadorD = loadImage("imagens/jogador/jogadorD.png");
    jogadorE = loadImage("imagens/jogador/jogadorE.png");
    jogadorPulandoD = loadImage("imagens/jogador/jogadorPulandoD.png");
    jogadorPulandoE = loadImage("imagens/jogador/jogadorPulandoE.png");

    abelhaE = loadImage("imagens/inimigos/abelhaE.png");
    abelhaD = loadImage("imagens/inimigos/abelhaD.png");

    novoRato.sprite.direita = loadImage("imagens/inimigos/ratoD.png");
    novoRato.sprite.esquerda = loadImage("imagens/inimigos/ratoE.png");

    moeda_img = loadImage("imagens/moeda_img.png");
    joia_azul = loadImage("imagens/joia_azul.png");
    bandeira_baixa = loadImage("imagens/bandeira_baixa.png");
    bandeira_levantada = loadImage("imagens/bandeira_levantada.png");
    vida_img = loadImage("imagens/vida.png");

    jogo.sons.perdeVida = loadSound('sons/perde_vida.ogg');
    jogo.sons.pulo = loadSound('sons/pula.ogg');
    jogo.sons.pegaMoeda = loadSound('sons/pega_moeda.wav');
}

function setup() {
    frameRate(30);
    createCanvas(1040, 580);
    jogador = jogadorD;
    novoJogador.sprite.atual = jogadorD;
    abelha = abelhaE;
    novoJogador.x = 10;
    novoJogador.y = 370;
    abe_x = 910;
    abe_y = 410;
    novoRato.x = 20;
    novoRato.y = 257;
    novoRato.sprite.atual = novoRato.sprite.esquerda;
}


function draw() {
    if (tela === 0) {
        background(65);
        noStroke();
        fill('#42adf4');
        textSize(65);
        text('Flag', 470, 152);
        image(bandeira_levantada, 600, 62);
        fill('#ff9721');
        textSize(32);
        text('Fácil', 490, 230);
        text('Médio', 490, 285);
        text('Difícil', 490, 340);
        if (mouseIsPressed) {
            if (mouseX > 480 && mouseY > 200 && mouseX < 580 && mouseY < 240) inicia_jogo(0);
            if (mouseX > 480 && mouseY > 250 && mouseX < 580 && mouseY < 290) inicia_jogo(1);
            if (mouseX > 480 && mouseY > 300 && mouseX < 580 && mouseY < 340) inicia_jogo(2);
        }
    }

    if (tela == 2) {
        background(65);
        noStroke();
        fill('#fff');
        textSize(42);
        text('Game Over', 415, 245);
        fill('#ff9721');
        textSize(32);
        text('Pressione ESPAÇO para voltar para o menu', 215, 300);
    }

    if (tela == 3) {
        background(65);
        noStroke();
        textSize(42);
        text('Fase concluída!', 380, 230);
        textSize(32);
        fill('#ff9721');
        text('Pressione ESPAÇO para voltar para o menu', 215, 285);
        text('Pontuação: ' + pontos + '/1500', 390, 380);
    }

    if (tela == 1) {
        anima_cont++;
        if (anima_cont > 10) anima_cont = 0;
        novoJogador.andando = false;
        trig_cont += 0.2;
        if (trig_cont > 2 * Math.PI) trig_cont = 0;
        velocidade_y += gravidade;
        novoJogador.y += velocidade_y;

        // Gameover
        if (vidas < 0) tela = 2;

        if (novoJogador.imune) novoJogador.imuneTempo++;
        if (novoJogador.imuneTempo > 40) {
            novoJogador.imuneTempo = 0;
            novoJogador.imune = false;
        }

        background(jogo.imagens.fundo);
        bandeira = (bandeira_ativa) ? bandeira_levantada : bandeira_baixa;
        image(jogo.imagens.plataforma, 0, 300);
        image(bandeira, 940, 420);
        if (joia_ativa) image(joia_azul, 20, 250 + Math.cos(trig_cont) * 4);
        image(jogo.imagens.piso, 0, 500);
        image(abelha, abe_x, abe_y + Math.cos(trig_cont) * 15);
        image(novoRato.sprite.atual, novoRato.x, novoRato.y);
        image(novoJogador.sprite.atual, novoJogador.x, novoJogador.y);

        // Movimentação da abelha
        if (abe_x < 375 && !abelha_ori) abelha_ori = true;
        if (abe_x > 830 && abelha_ori) abelha_ori = false;

        if (abelha_ori) {
            abe_x += 7 + (dificuldade[dif_atual][2] * 0.8);
            abelha = abelhaD;
        } else if (!abelha_ori) {
            abe_x -= 7 + (dificuldade[dif_atual][2] * 0.8);
            abelha = abelhaE;
        }

        if (novoRato.x < 20 && !novoRato.orientacao) novoRato.orientacao = true;
        if (novoRato.x > 300 && novoRato.orientacao) novoRato.orientacao = false;

        if (novoRato.orientacao) {
            novoRato.x += 8 + (dificuldade[dif_atual][2] * 0.8);
            novoRato.sprite.atual = novoRato.sprite.direita;
        } else if (!novoRato.orientacao) {
            novoRato.x -= 8 + (dificuldade[dif_atual][2] * 0.8);
            novoRato.sprite.atual = novoRato.sprite.esquerda;
        }

        parede_esqueda = (novoJogador.x < 0);
        parede_direita = (novoJogador.x+novoJogador.sprite.atual.width > width);

        // Colisão com abelha
        if (colisao_jogador(abelha, abe_x, abe_y) || colisao_jogador(novoRato.sprite.atual, novoRato.x, novoRato.y)) {
            if (!novoJogador.imune) {
                vidas -= 1;
                jogo.sons.perdeVida.play();
                novoJogador.imune = true;
                novoJogador.y -= 10;
                velocidade_y = -10;
            }
        }

        // Colisão com as moedas
        for (i = 0; i < moedas_x.length; i++) {
            if (moeda_ativa[i]) image(moeda_img, moedas_x[i], moedas_y[i] + Math.sin(trig_cont) * 6);
            if (colisao_jogador(moeda_img, moedas_x[i], moedas_y[i]) && moeda_ativa[i]) {
                moeda_ativa[i] = false;
                pontos += 100;
                jogo.sons.pegaMoeda.play();
            }
        }

        // Colisão com Joia Azul
        if (colisao_jogador(joia_azul, 20, 250) && joia_ativa) {
            joia_ativa = false;
            bandeira_ativa = true;
            pontos += 300;
            jogo.sons.pegaMoeda.play();
        }


        // Colisão com bandeira
        if (colisao_jogador(bandeira, 940, 420) && bandeira_ativa) {
            tela = 3;
        }

        if (novoJogador.y + novoJogador.sprite.atual.height > 500) {
            novoJogador.y = 500 - jogador.height;
            velocidade_y = 0;
            novoJogador.pulando = false;
            novoJogador.pulando = false;
        }

        if (novoJogador.y + novoJogador.sprite.atual.height > 300 && novoJogador.y + novoJogador.sprite.atual.height < 360 && novoJogador.x < 350) {
            novoJogador.y = 300 - novoJogador.sprite.atual.height;
            velocidade_y = 0;
            novoJogador.pulando = false;
            novoJogador.pulando = false;
        }

        if (novoJogador.x < 355 && novoJogador.y < 381 && novoJogador.y > 300) {
            velocidade_y = 8;
        }

        if (novoJogador.x < 365 && novoJogador.y > 300 && novoJogador.y < 360) {
            parede_esqueda = true;
        }

        if (keyIsDown(LEFT_ARROW) && !parede_esqueda) {
            novoJogador.x -= 8;
            novoJogador.andando = true;
            novoJogador.orientacao = false;
            if (!novoJogador.pulando) novoJogador.sprite.atual = (anima_cont > 5) ? jogadr.img.paradoEsquerda : jogadr.img.andandoEquerda;
        }

        if (keyIsDown(RIGHT_ARROW) && !parede_direita) {
            novoJogador.x += 8;
            novoJogador.andando = true;
            novoJogador.orientacao = true;
            if (!novoJogador.pulando) novoJogador.sprite.atual = (anima_cont > 5) ? jogadorD : jogadorAD;
        }
        
        // 
        if (!novoJogador.pulando && !novoJogador.andando) novoJogador.sprite.atual = (novoJogador.orientacao) ? jogadorD : jogadorE;
        if (novoJogador.pulando || velocidade_y !== 0) novoJogador.sprite.atual = (novoJogador.orientacao) ? jogadorPulandoD : jogadorPulandoE;

        fill(65);
        textSize(32);
        image(moeda_img, 20, 60);
        text(pontos, 70, 92);
        image(vida_img, 15, 0, 50, 50);
        text(vidas, 70, 38);
        image(jogadorPulandoD, 110, 2, 50, 50);
        text(pulos, 170, 38);
    }
}