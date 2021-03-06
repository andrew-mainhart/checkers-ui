import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoomService} from '../room.service';
import {UserService} from '../user.service';
import {Room} from '../types/Room';
import {User} from '../types/User';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.css']
})
export class JoinRoomComponent implements OnInit, OnDestroy {

  constructor(private roomService: RoomService,
              private userService: UserService,
              private router: Router) { }

  room: Room = null;
  currentUser: User = null;
  username = '';
  room_name = '';

  userSubscription: Subscription;
  roomSubscription: Subscription;

  ngOnInit() {
    this.userService.getUser().subscribe((value) => {
      this.currentUser = value;
    });
  }

  submitUsername () {

    const user: User = new User();
    user.name = this.username;

    this.userService.setUser(user);
  }

  submitRoomName () {
    console.log(this.room_name);

    if(this.roomSubscription){
      this.roomSubscription.unsubscribe();
    }

    this.roomSubscription = this.roomService.joinRoom(this.currentUser, this.room_name).subscribe((value => {
        if (value != null) {
          this.room = value;
          this.router.navigate(["/room", this.room.code]);
        }
    }), (error => {
      console.log (error);
    }));
  }

  ngOnDestroy(){
    if(this.roomSubscription){
      this.roomSubscription.unsubscribe();
    }
  }
}
