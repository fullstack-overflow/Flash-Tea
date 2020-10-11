import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
    console.log(this.authService.getDataFromCurrentUser());
  }

}
