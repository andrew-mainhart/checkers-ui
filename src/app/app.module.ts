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

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    FooterComponent,
    NewRoomComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [RoomService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
