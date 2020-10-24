import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
import { Location } from '@angular/common';

import { UserDataService } from '../../services/user-data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  userId: string;
  userProfile: object;
  currentUser: any;
  displayName = '';
  uid = '';
  email = '';
  phoneNumber = 0;
  address = '';
  photoURL = '';

  constructor(
    private router: Router,
    public toats: ToastService,
    private location: Location,
    public userDataService: UserDataService,
    public authService: AuthenticationService
  ) {
    this.userId = this.router.url.split(`/root/user-profile/`).join(``);
  }

  async ngOnInit() {
    await this.callUserDataService(this.userId);
    await this.initLocalStorage();
  }

  async callUserDataService(userId: string) {
    await this.userDataService.initUserProfile(userId);
  }

  async initLocalStorage() {
    this.currentUser = await JSON.parse(localStorage.getItem('user'));
  }

  async ionViewWillEnter() {
    if (this.userDataService.userProfile === undefined) {
      this.displayName = await this.currentUser.displayName;
      this.uid = await this.currentUser.uid;
      this.email = await this.currentUser.email;
      this.photoURL = await this.currentUser.photoURL;
      // await this.toats.presentToast('Profile page not ready, please try again! Thank you');
      // await this.router.navigate(['root/home']);
    }
  }

  async ionViewDidEnter() {
    if (this.userDataService.userProfile !== undefined) {
      this.displayName = await this.userDataService.userProfile.displayName;
      this.uid = await this.userDataService.userProfile.uid;
      this.email = await this.userDataService.userProfile.email;
      this.photoURL = await this.userDataService.userProfile.photoURL;
      this.address = await this.userDataService.userProfile.address;
      this.phoneNumber = await this.userDataService.userProfile.phoneNumber;
    }
  }

  navigateToOrderPage() {
    this.router.navigateByUrl(`root/user-bill/${this.userId}`);
  }

  goBack() {
    this.location.back();
  }

  logOut() {
    this.authService.signOut();
  }

  navigateToUpdateProfile() {
    this.router.navigateByUrl('form-update');
  }
}
