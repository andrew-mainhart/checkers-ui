import {Game} from "./Game";
import {User} from "./User";

export class Room {
  version: number;
  code: string;
  checkersGame: Game;
  owner: User;
  players: User[];
  observers: User[];
  history: Game[];
}
