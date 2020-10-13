import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.page.html',
  styleUrls: ['./info-user.page.scss'],
})
export class InfoUserPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public toastServide: ToastService
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.signOut();
  }
}
