import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../types/Board";
import {Coord} from "../types/Coord";
import {Chip} from "../types/Chip";
import {Move} from '../types/Move';
import {User} from '../types/User';
import {UserService} from '../user.service';
import {RoomService} from '../room.service';
import {Room} from '../types/Room';

@Component({
  selector: 'app-checker-board',
  templateUrl: './checker-board.component.html',
  styleUrls: ['./checker-board.component.css']
})
export class CheckerBoardComponent implements OnInit {

  constructor(private userService: UserService,
              private roomService: RoomService) { }

  @Input("board")
  public checkersBoard: Board;

  private selectedCoord: Coord = null;
  private selectedChip: Chip = null;
  public currentUser: User = null;

  ngOnInit() {
    this.userService.getUser().subscribe(value => {
      this.currentUser = value;
    });
  }

  public handleClick(coord: Coord) {
    if (this.selectedCoord == null) {
      this.selectedCoord = coord;
      this.selectedChip = this.getChipAt(coord);
    } else {
      const move: Move = new Move();
      const room = this.roomService.getCurrentRoom();
      move.fromSpot = this.selectedCoord;
      move.toSpot = coord;
      move.chip = this.selectedChip;
      move.intermediateSpots = [];
      move.byPlayer = this.currentUser;
      this.roomService.makeMove(move, room.getValue().code);
      this.selectedCoord = null;
    }
  }

  public getChipAt(coord: Coord): Chip {
    if (this.checkersBoard.board.length > coord.x) {
      if (this.checkersBoard.board[coord.x].length > coord.y) {
        return this.checkersBoard.board[coord.x][coord.y];
      }
    }
    throw "Invalid coordinates.";
  }

  public isSelected(coord: Coord): boolean {
    if (this.selectedCoord == null) return false;
    if (this.selectedCoord.x == coord.x && this.selectedCoord.y == coord.y) return true;
    return false;

  }

  public isAllowedSpot(coord: Coord): boolean{
      if (coord.x % 2 == 0) {
        return coord.y % 2 == 0;
      } else {
        return coord.y % 2 != 0;
      }
  }

}
