import {Chip} from "./Chip";
import {Coord} from "./Coord";

export class Board {
  size: number;
  board: Chip[][];


  getChipAt(coord: Coord): Chip {
    if (this.board.length > coord.x) {
      if (this.board[coord.x].length > coord.y) {
        return this.board[coord.x][coord.y];
      }
    }
    throw "Invalid coordinates.";
  }

}
