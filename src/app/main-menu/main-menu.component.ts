import {Component, OnInit} from "@angular/core";
import {AuthService} from "./auth/auth.service";
import {User} from "./auth/user.model";

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {
  isAuth = false;
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.user.subscribe((user: User) => {
      this.isAuth = !!user;
    })
  }

  onLogout() {
    this.authService.logout();
  }
}
