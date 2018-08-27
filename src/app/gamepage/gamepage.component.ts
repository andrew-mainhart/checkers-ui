import { Component, OnInit } from '@angular/core';
import {Game} from "../types/Game";
import {Room} from "../types/Room";
import {RoomService} from "../room.service";

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  public room: Room;

  ngOnInit() {
    this.roomService.getCurrentRoom().subscribe(value => {
      this.room = value;
    })
  }

}
