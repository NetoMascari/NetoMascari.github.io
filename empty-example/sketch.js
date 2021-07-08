//Dimensões da Tela
var largura = 800;
var altura = 600;

//Declaração de variáveis do jogo

var alDefLado; // (número) Aleatório Define Lado

var posX = largura/2, posY = altura/2;

var raio = 15;
var velocidade = 5;
var velocidadeY = 5;

var velocidadeJogador = 7;

var j1Y = altura/2;
var j2Y = altura/2;

var pontosJ1 = 0;
var pontosJ2 = 0;


function setup() {
    createCanvas(largura, altura);
    alDefLado = round(random(1));
}

// Desenha o circulo no centro com lado aleatório
function circleInicial() {
    posX = largura/2;
    posY = altura/2;
    circle(posX, posY, raio*2);
    alDefLado = round(random(1)); 
}

function desenhaRede() {
    fill(255, 75)
    for (var i = 0; i <= 600; i += 22.5) {
        rect(largura/2, i, 10, 15);
    }
    fill(255);
}

function draw() {
    background(0);
    desenhaRede();
    ladoInicial();
    circle(posX, posY, raio*2);
    Jogadores();

    posY += velocidadeY;
    if ((posY >= height-raio) || (posY <= raio)){
        velocidadeY = -velocidadeY;
    }

}

// Escolhe um lado aleatoriamente para começar
function ladoInicial() {
    if (alDefLado == 0) { //Lado direito começa
        posX += velocidade;
    } else if (alDefLado == 1) { //Lado esquerdo começa
        posX -= velocidade;
    }
}

// Funcionalidades dos Jogadores
function Jogadores() {

    jogador1();
    jogador2();
    sistemaPonto();
    impactoRaquete();

    // Cria Jogador 1
    function jogador1() {
        
        rect(50, j1Y - 50, 15, 100); // Desenha Jogador 1

        // Movimentação do Jogador 1
        if (keyIsDown(87) && j1Y - 50>= 0) {
            j1Y -= velocidadeJogador;
        }
        if (keyIsDown(83) && j1Y + 50 <= height) {
            j1Y += velocidadeJogador;
        }
    }
    // Cria Jogador 2
    function jogador2() {
        
        rect(width - 65, j2Y - 50, 15, 100); // Desenha Jogador 2

        // Movimentação do Jogador 2
        if (keyIsDown(UP_ARROW) && j2Y - 50>= 0) {
            j2Y -= velocidadeJogador;
        }
        if (keyIsDown(DOWN_ARROW) && j2Y + 50 <= height) {
            j2Y += velocidadeJogador;
        }
    }
    
    // Sistema de Pontuação e Placar
    function sistemaPonto() {
        if (posX > width - raio) {
            pontosJ1++;
            velocidade = 5;
            circleInicial();
        } else if (posX - raio < 0) {
            pontosJ2++;
            velocidade = 5;
            circleInicial();
        }
        // Desenha Placar
        textAlign(CENTER);
        textSize(64);
        fill(255, 75);
        text(pontosJ1, 250, 75);
        text(pontosJ2, width - 250, 75);
        fill(255);
    }

    // Impacto do circulo nas raquetes
    function impactoRaquete() {
        if (((posX <= 50 + 15 + raio) && (posX >= 50 + raio)) && (posY <= j1Y + 50 + raio) && (posY >= j1Y - 50 - raio)) { //Raquete esquerda
            velocidade = -velocidade;
            velocidadeY = random(velocidade, velocidadeY);
        } else if (((posX >= largura - (50 + 15 + raio)) && (posX <= largura - (50 + raio))) && (posY <= j2Y + 50 + raio) && (posY >= j2Y - 50 - raio)) { //Raquete direita
            velocidade = -velocidade;
            velocidadeY = random(velocidade, velocidadeY);
        }
    }
}
