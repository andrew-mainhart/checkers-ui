import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from "../room.service";
import {Room} from "../types/Room";
import {UserService} from "../user.service";
import {User} from "../types/User";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-new-room',
  templateUrl: './new-room.component.html',
  styleUrls: ['./new-room.component.css']
})
export class NewRoomComponent implements OnInit, OnDestroy {

  constructor(private roomService: RoomService,
              private userService: UserService,
              private router: Router) { }

  room: Room = null;
  currentUser: User = null;
  username: string = "";

  //Subscriptions
  userSubscription: Subscription;
  roomSubscription: Subscription;


  ngOnInit() {
    this.userSubscription = this.userService.getUser().subscribe((value) => {
      this.currentUser = value;
    });
  }

  newRoom() {

    if (this.currentUser == null) {
      let user: User = new User();
      user.name = this.username;

      this.userService.setUser(user).subscribe((val => {
        this.roomSubscription = this.roomService.newRoom().subscribe((value => {
          this.room = value;
        }));
      }));
    } else {
      this.roomSubscription = this.roomService.newRoom().subscribe((value => {
        this.room = value;
      }));
    }
  }

  goToRoom() {
    this.router.navigate(["/room", this.room.code]);
    // Redirect to page.
  }

  ngOnDestroy(){
    if(this.userSubscription){
      this.userSubscription.unsubscribe();
    }

    if(this.roomSubscription){
      this.roomSubscription.unsubscribe();
    }
  }
}
