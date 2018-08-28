import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {GamepageComponent} from "./gamepage/gamepage.component";
import {UserResolver} from "./resolvers/UserResolver";


const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomepageComponent},
    {path: 'room/:code', component: GamepageComponent, resolve : { user : UserResolver}}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
