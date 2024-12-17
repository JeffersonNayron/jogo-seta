const player = document.getElementById('player');
const gameContainer = document.getElementById('game-container');
let playerPosition = 180;
const playerSpeed = 20;
let obstacles = [];
let gameInterval;
let score = 0;

// Função para mover o jogador
function movePlayer(event) {
  if (event.key === 'ArrowLeft' && playerPosition > 0) {
    playerPosition -= playerSpeed;
  } else if (event.key === 'ArrowRight' && playerPosition < 360) {
    playerPosition += playerSpeed;
  }
  player.style.left = ${playerPosition}px;
}

// Criar obstáculos
function createObstacle() {
  const obstacle = document.createElement('div');
  obstacle.classList.add('obstacle');
  obstacle.style.left = ${Math.floor(Math.random() * 360)}px;
  obstacle.style.top = '0px';
  gameContainer.appendChild(obstacle);
  obstacles.push(obstacle);
}

// Mover obstáculos
function moveObstacles() {
  obstacles.forEach((obstacle, index) => {
    let obstacleTop = parseInt(obstacle.style.top);
    obstacle.style.top = ${obstacleTop + 10}px;

    // Detectar colisão
    if (
      obstacleTop > 550 &&
      obstacleTop < 600 &&
      Math.abs(parseInt(obstacle.style.left) - playerPosition) < 40
    ) {
      alert(Game Over! Sua pontuação: ${score});
      clearInterval(gameInterval);
    }

    // Remover obstáculos fora da tela
    if (obstacleTop > 600) {
      gameContainer.removeChild(obstacle);
      obstacles.splice(index, 1);
      score++;
    }
  });
}

// Iniciar o jogo
function startGame() {
  document.addEventListener('keydown', movePlayer);
  gameInterval = setInterval(() => {
    createObstacle();
    moveObstacles();
  }, 500);
}

startGame();