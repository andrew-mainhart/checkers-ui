import { Component, OnInit } from '@angular/core';
import {RoomService} from "../room.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private roomService: RoomService) { }

  public newRoomFlyover: boolean = false;

  ngOnInit() {
  }


}
