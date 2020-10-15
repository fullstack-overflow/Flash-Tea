import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../shared/authentication.service';

import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-shop-info',
  templateUrl: './shop-info.page.html',
  styleUrls: ['./shop-info.page.scss'],
})
export class ShopInfoPage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    public toastServide: ToastService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.authService.signOut();
  }
}
