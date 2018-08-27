import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../types/Board";
import {Coord} from "../types/Coord";
import {Chip} from "../types/Chip";

@Component({
  selector: 'app-checker-board',
  templateUrl: './checker-board.component.html',
  styleUrls: ['./checker-board.component.css']
})
export class CheckerBoardComponent implements OnInit {

  constructor() { }

  @Input("board")
  public checkersBoard: Board;

  ngOnInit() {
  }

  public getChipAt(coord: Coord): Chip {
    if (this.checkersBoard.board.length > coord.x) {
      if (this.checkersBoard.board[coord.x].length > coord.y) {
        return this.checkersBoard.board[coord.x][coord.y];
      }
    }
    throw "Invalid coordinates.";
  }

}
