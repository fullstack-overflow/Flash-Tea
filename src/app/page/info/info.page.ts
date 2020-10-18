import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const getUser = JSON.parse(localStorage.getItem('user'));
    const getadminList = JSON.parse(localStorage.getItem('shopsAccount'));
    if (getUser === null) {
      return this.router.navigate(['login']);
    }

    if (getUser.emailVerified === false) {
      return this.router.navigate(['verify-email']);
    }
    console.log(getadminList);
    const emailFind = getadminList.find(item => {
      return item.email === getUser.email;
    });

    if (emailFind !== undefined && getUser !== null) {
      return this.router.navigate(['root/shop-info']);
    }

    if (emailFind === undefined && getUser !== null) {
      return this.router.navigate(['root/info-user']);
    }
  }

}
