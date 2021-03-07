import Snake from './snake.js';
import { randomGridPosition } from './grid.js';

let food = randomGridPosition();
const EXPANSION_RATE = 5;
const snake = new Snake();

export default class Food {
  update() {
    if(snake.onSnake(food)) {
      snake.expandSnake(EXPANSION_RATE);
      food = this.randomPosition();
    }
  }

  render(gameBoard) {
    const foodElement = document.createElement('div');
    
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');

    gameBoard.appendChild(foodElement);
  }

  randomPosition() {
    let newFoodPosition
  
    while (newFoodPosition == null || snake.onSnake(newFoodPosition)) {
      newFoodPosition = randomGridPosition();
    }
    return newFoodPosition
  }
}