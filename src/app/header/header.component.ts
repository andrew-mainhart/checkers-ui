import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../types/User";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) { }

  public currentUser: User = null;

  ngOnInit() {

    this.userService.getUser().subscribe(value => {
      this.currentUser = value;
    });
  }

}
