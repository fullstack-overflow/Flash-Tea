import { Injectable } from '@angular/core';

type Admin = {
  email: string
};

@Injectable({
  providedIn: 'root'
})
export class AdminListService {
  adminList: Admin[];
  constructor() {
    this.adminList =
      [{
        email: 'quoctrung163@yandex.com'
      }, {
        email: 'yuikiyokoproductions@gmail.com'
      }, {
        email: 'phanquocctrung@gmail.com'
      }];
  }
}
