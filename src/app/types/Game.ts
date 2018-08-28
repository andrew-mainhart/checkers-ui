import {User} from "./User";
import {Board} from './Board';
import {Move} from './Move';

export class Game {
  board: Board;
  moves: Move[];
  player1: User;
  player2: User;
  playerOneScore: number;
  playerTwoScore: number
}
