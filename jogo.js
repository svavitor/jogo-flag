var tela = 0;
var jogador, jog_x, jog_y, jogador_ori = true;
var jogadorAD, jogadorAE, jogadorD, jogadorE;
var jogadorPulandoD, jogadorPulandoE;
var velocidade_y = 0;
var gravidade = 1.5;
var andando = false;
var pulando = false;

var abelha, abe_x, abe_y, abelha_ori = false; 
var abelhaE, abelhaD;

var rato, ra_x, ra_y, rato_ori = false;
var ratoE, ratoD;

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
    if (jog_x < x + objeto.width && jog_x + jogador.width > x &&
        jog_y < y + objeto.height && jog_y + jogador.height > y) {
        return true;
    }
    return false;
}

function inicia_jogo(dif) {
    vidas = dificuldade[dif][1];
    pulos = dificuldade[dif][0];
    dif_atual = dif;
    pontos = 0;
    jog_x = 10;
    jog_y = 370;
    for (i = 0; i < moeda_ativa.length; i++) moeda_ativa[i] = true;
    joia_ativa = true;
    bandeira_ativa = false;
    tela = 1;
}

function keyPressed() {
    if (tela > 1 && keyCode === 32) tela = 0;

    if (keyCode === UP_ARROW && (!pulando) && pulos > 0) {
        pulos -= 1;
        jogo.sons.pulo.play();
        velocidade_y = -26;
        pulando = true;
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
    ratoD = loadImage("imagens/inimigos/ratoD.png");
    ratoE = loadImage("imagens/inimigos/ratoE.png");
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
    abelha = abelhaE;
    rato = ratoE;
    jog_x = 10;
    jog_y = 370;
    abe_x = 910;
    abe_y = 410;
    ra_x = 20;
    ra_y = 257;
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
        andando = false;
        trig_cont += 0.2;
        if (trig_cont > 2 * Math.PI) trig_cont = 0;
        velocidade_y += gravidade;
        jog_y += velocidade_y;
        if (vidas < 0) tela = 2;

        if (vida_imune) imune_cont++;
        if (imune_cont > 40) {
            imune_cont = 0;
            vida_imune = false;
        }

        background(jogo.imagens.fundo);
        bandeira = (bandeira_ativa) ? bandeira_levantada : bandeira_baixa;
        image(jogo.imagens.plataforma, 0, 300);
        image(bandeira, 940, 420);
        if (joia_ativa) image(joia_azul, 20, 250 + Math.cos(trig_cont) * 4);
        image(jogo.imagens.piso, 0, 500);
        image(abelha, abe_x, abe_y + Math.cos(trig_cont) * 15);
        image(rato, ra_x, ra_y);
        image(jogador, jog_x, jog_y);

        if (abe_x < 375 && !abelha_ori) abelha_ori = true;
        if (abe_x > 830 && abelha_ori) abelha_ori = false;

        if (abelha_ori) {
            abe_x += 7 + (dificuldade[dif_atual][2] * 0.8);
            abelha = abelhaD;
        } else if (!abelha_ori) {
            abe_x -= 7 + (dificuldade[dif_atual][2] * 0.8);
            abelha = abelhaE;
        }

        if (ra_x < 20 && !rato_ori) rato_ori = true;
        if (ra_x > 300 && rato_ori) rato_ori = false;

        if (rato_ori) {
            ra_x += 8 + (dificuldade[dif_atual][2] * 0.8);
            rato = ratoD;
        } else if (!rato_ori) {
            ra_x -= 8 + (dificuldade[dif_atual][2] * 0.8);
            rato = ratoE;
        }

        parede_esqueda = (jog_x < 0);
        parede_direita = (jog_x+jogador.width > width);

        if (colisao_jogador(abelha, abe_x, abe_y) || colisao_jogador(rato, ra_x, ra_y)) {
            if (!vida_imune) {
                vidas -= 1;
                jogo.sons.perdeVida.play();
                vida_imune = true;
                jog_y -= 10;
                velocidade_y = -10;
            }
        }

        for (i = 0; i < moedas_x.length; i++) {
            if (moeda_ativa[i]) image(moeda_img, moedas_x[i], moedas_y[i] + Math.sin(trig_cont) * 6);
            if (colisao_jogador(moeda_img, moedas_x[i], moedas_y[i]) && moeda_ativa[i]) {
                moeda_ativa[i] = false;
                pontos += 100;
                jogo.sons.pegaMoeda.play();
            }
        }

        if (colisao_jogador(joia_azul, 20, 250) && joia_ativa) {
            joia_ativa = false;
            bandeira_ativa = true;
            pontos += 300;
            jogo.sons.pegaMoeda.play();
        }

        if (colisao_jogador(bandeira, 940, 420) && bandeira_ativa) {
            tela = 3;
        }

        if (jog_y + jogador.height > 500) {
            jog_y = 500 - jogador.height;
            velocidade_y = 0;
            pulando = false;
        }

        if (jog_y + jogador.height > 300 && jog_y + jogador.height < 360 && jog_x < 350) {
            jog_y = 300 - jogador.height;
            velocidade_y = 0;
            pulando = false;
        }

        if (jog_x < 355 && jog_y < 381 && jog_y > 300) {
            velocidade_y = 8;
        }

        if (jog_x < 365 && jog_y > 300 && jog_y < 360) {
            parede_esqueda = true;
        }

        if (keyIsDown(LEFT_ARROW) && !parede_esqueda) {
            jog_x -= 8;
            andando = true;
            jogador_ori = false;
            if (!pulando) jogador = (anima_cont > 5) ? jogadr.img.paradoEsquerda : jogadr.img.andandoEquerda;
        }

        if (keyIsDown(RIGHT_ARROW) && !parede_direita) {
            jog_x += 8;
            andando = true;
            jogador_ori = true;
            if (!pulando) jogador = (anima_cont > 5) ? jogadorD : jogadorAD;
        }

        if (!pulando && !andando) jogador = (jogador_ori) ? jogadorD : jogadorE;
        if (pulando || velocidade_y !== 0) jogador = (jogador_ori) ? jogadorPulandoD : jogadorPulandoE;

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