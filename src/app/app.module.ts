import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {RoomService} from "./room.service";
import {HttpClientModule} from "@angular/common/http";
import { NewRoomComponent } from './new-room/new-room.component';
import {UserService} from "./user.service";
import {FormsModule} from '@angular/forms';
import { JoinRoomComponent } from './join-room/join-room.component';
import {CheckerBoardComponent} from "./checker-board/checker-board.component";
import {GamepageComponent} from "./gamepage/gamepage.component";
import {AppRoutingModule} from "./app-routing.module";
import {UserResolver} from "./resolvers/UserResolver";
import { GameSidebarComponent } from './game-sidebar/game-sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    NewRoomComponent,
    JoinRoomComponent,
    CheckerBoardComponent,
    GamepageComponent,
    GameSidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [RoomService, UserService,  UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
