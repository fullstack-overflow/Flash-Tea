import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})

export class DashboardPage implements OnInit {

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
