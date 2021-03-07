import { getInput } from "./input.js";

export const SNAKE_SPEED = 5;
const snakeBody = [{ x: 11, y: 11}];
let newSegments = 0;

export default class Snake {
  update() {

    this.addSegments();
    const inputDirection = getInput();

    for(let i = snakeBody.length - 2; i >= 0; i--) {
      snakeBody[i + 1] = { ...snakeBody[i] };
    }

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
  }


  render(gameBoard) {
    snakeBody.forEach(segment => {
      const snakeElement = document.createElement('div');

      snakeElement.style.gridRowStart = segment.x;
      snakeElement.style.gridColumnStart = segment.y;
      snakeElement.classList.add('snake');

      gameBoard.appendChild(snakeElement);
    });
  }

  expandSnake(amount) {
    newSegments += amount
  }

  onSnake(position, { ignoreHead = false } = {}) {
    return snakeBody.some((segment, index) => {
      //console.log(segment)
      if(ignoreHead && index === 0) return false;
      return this.equalPositions(segment, position);
    });
  }

  getSnakeHead() {
    return snakeBody[0];
  }

  snakeIntersection() {
    return this.onSnake(snakeBody[0], {ignoreHead: true });
  }

  equalPositions(pos1, pos2) {
    return pos1.y === pos2.x && pos1.x === pos2.y;
  }

  addSegments() {
    for(let i = 0; i < newSegments; i++) {
      snakeBody.push({ ...snakeBody[snakeBody.length - 1] }) 
    }
    newSegments = 0;
  }
}