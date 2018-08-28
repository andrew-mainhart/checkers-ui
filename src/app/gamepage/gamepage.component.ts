import {Component, OnInit} from '@angular/core';
import {Game} from "../types/Game";
import {Room} from "../types/Room";
import {RoomService} from "../room.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.css']
})
export class GamepageComponent implements OnInit {

  constructor(private roomService: RoomService,
              private route: ActivatedRoute,
              private userService: UserService) {
  }

  public room: Room;
  public isOwner: boolean;

  ngOnInit() {

    let user = this.route.snapshot.data["user"];
    let roomcode = this.route.snapshot.params["code"];

    if (user == null) {
      alert("Sign in dummy");
      return;
    } else if (this.roomService.getCurrentRoom().getValue() == null) {
      this.roomService.joinRoom(user, roomcode).subscribe(value => {
        if(value != null) {
          this.room = value;
          this.isOwner = this.room.owner == user;
        }
      })
    } else {
      this.roomService.getCurrentRoom().subscribe(value => {
        if(value != null) {
          this.room = value;
          this.isOwner = this.room.owner == user;
        }
      })
    }
  }

  startGame(){
    this.roomService.startGame(this.room);
  }

}
