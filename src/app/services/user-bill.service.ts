import { Injectable } from '@angular/core';

import { CrudService } from './crud.service';

import { UserBill } from '../types/user-bill';

@Injectable({
  providedIn: 'root'
})
export class UserBillService {
  userBill: UserBill;
  constructor(private crudService: CrudService) { }

  initUserBill(billId: string): void {
    this.crudService.getBillOrderForCustomer().subscribe(data => {
      this.userBill = data.map(e => {
        return {
          // tslint:disable-next-line:no-string-literal
          id: e.payload.doc.data()['id'],
          // tslint:disable-next-line:no-string-literal
          data: e.payload.doc.data()['data'],
          // tslint:disable-next-line:no-string-literal
          dateOrder: e.payload.doc.data()['dateOrder'],
          // tslint:disable-next-line:no-string-literal
          detail: e.payload.doc.data()['detail'],
          // tslint:disable-next-line:no-string-literal
          total: e.payload.doc.data()['total'],
          // tslint:disable-next-line:no-string-literal
          codeOrder: e.payload.doc.data()['coderOrder']
        };
      }).find(bill => bill.id === billId);

      if (this.userBill === undefined) {
        this.userBill = {
          id: '',
          data: '',
          dateOrder: '',
          detail: '',
          total: 0,
          codeOrder: '',
        };
      }
    });
  }
}
