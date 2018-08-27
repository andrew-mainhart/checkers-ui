import { Component, OnInit } from '@angular/core';
import {Game} from "../types/Game";

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  constructor() { }

  public game: Game;

  ngOnInit() {
  }

}
