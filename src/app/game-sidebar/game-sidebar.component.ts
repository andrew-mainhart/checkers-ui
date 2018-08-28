import {Component, Input, OnInit} from '@angular/core';
import {Game} from "../types/Game";
import {User} from "../types/User";
import {UserService} from "../user.service";
import {RoomService} from "../room.service";

@Component({
  selector: 'app-game-sidebar',
  templateUrl: './game-sidebar.component.html',
  styleUrls: ['./game-sidebar.component.css']
})
export class GameSidebarComponent implements OnInit {

  constructor(private userService: UserService,
              private roomService: RoomService) { }

  @Input("game")
  public game: Game;

  @Input("player")
  public player: User;

  ngOnInit() {
    this.userService.getUser().subscribe(value => {
      this.player = value;
    })
  }

  isRed(user?: User): boolean{
    if(user){
      return user.uuid == this.game.player1.uuid;
    } else {
      return this.game.player1.uuid == this.player.uuid;
    }
  }

  isTurn():boolean {
    return this.game.turnUser.uuid == this.player.uuid;
  }

  newGame(){
    this.roomService.startGame(this.roomService.getCurrentRoom().getValue());
  }

}
