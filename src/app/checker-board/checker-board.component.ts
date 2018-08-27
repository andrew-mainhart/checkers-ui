import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../types/Board";

@Component({
  selector: 'app-checker-board',
  templateUrl: './checker-board.component.html',
  styleUrls: ['./checker-board.component.css']
})
export class CheckerBoardComponent implements OnInit {

  constructor() { }

  @Input("board")
  public board: Board;

  ngOnInit() {
  }

}
