import Food from './food.js';
import Snake, { SNAKE_SPEED } from './snake.js';
import { outsideGrid } from './grid.js'

const snake = new Snake();
const food = new Food();

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {

  if(gameOver) {
    if(confirm('Você Perdeu! Pressione ok para reiniciar.')) {
      window.location = '/'
    }
  }

  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if(secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update()

  render()
  
}

window.requestAnimationFrame(main);

function update() {
  snake.update();
  food.update();
  checkDeath();
}

function render() {
  gameBoard.innerHTML = '';
  snake.render(gameBoard);
  food.render(gameBoard);
}

function checkDeath() {
  gameOver = outsideGrid(snake.getSnakeHead()) || snake.snakeIntersection();
}