import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToastService } from 'src/app/services/toast.service';
import { UserBillService } from '../../services/user-bill.service';

@Component({
  selector: 'app-user-bill',
  templateUrl: './user-bill.page.html',
  styleUrls: ['./user-bill.page.scss'],
})
export class UserBillPage implements OnInit {

  billId: string;

  codeOrder = '';
  detail = '';
  dateOrder = '';
  total = 0;

  allDataUserBill: any;

  data: any;

  constructor(
    private router: Router,
    public toats: ToastService,
    public userBillService: UserBillService
  ) {
    this.billId = this.router.url.split('/root/user-bill/').join('');
  }

  async ngOnInit() {
    await this.userBillService.initUserBill(this.billId);
  }

  async ionViewWillEnter() {
    if (this.userBillService.userBill === undefined) {
      await this.toats.presentToast('User bill page not ready, please try again! Thank you');
      await this.router.navigate(['root/home']);
    }
  }

  async ionViewDidEnter() {
    if (this.userBillService.userBill !== undefined) {
      this.codeOrder = await this.userBillService.userBill.codeOrder;
      this.detail = await this.userBillService.userBill.detail;
      this.dateOrder = await this.userBillService.userBill.dateOrder;
      this.total = await this.userBillService.userBill.total;
      this.data = await this.userBillService.userBill.data;
      this.allDataUserBill = await this.userBillService.userBill;
    }
    // this.codeOrder = await this.userBillService.userBill.codeOrder;
    // this.detail = await this.userBillService.userBill.detail;
    // this.dateOrder = await this.userBillService.userBill.dateOrder;
    // this.total = await this.userBillService.userBill.total;
    // this.data = await this.userBillService.userBill.data;
    // this.allDataUserBill = await this.userBillService.userBill;
  }
}
