import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {User} from "../types/User";
import {UserService} from "../user.service";

@Injectable()
export class UserResolver implements Resolve<User> {

  constructor(private userService: UserService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<User> {
    return this.userService.getUserNoCache();
  }
}
