import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class MainNavComponent {

  show = false;

  constructor(public auth: AuthService) { }

  toggleCollapse() {
    this.show = !this.show;
  }

  logout() {
    this.auth.signOut();
  }

}
