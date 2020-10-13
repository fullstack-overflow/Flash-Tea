import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/authentication.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.scss'],
})
export class RootPage implements OnInit {

  isLoogedIn: object | null;
  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    this.isLoogedIn = firebase.auth().currentUser;
  }

  checkUserLoggedForNavigate() {
    if (this.isLoogedIn === null) {
      return false;
    } else { return true; }
    // if (this.isLoogedIn === false) {
    //   return false;
    // } else {
    //   return true;
    // }
  }
}
