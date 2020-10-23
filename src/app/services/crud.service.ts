import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private firestore: AngularFirestore) { }

  getItemsFromFirebaseCloud() {
    return this.firestore.collection('items').snapshotChanges();
  }

  getShopAccountFromFirebaseCloud() {
    return this.firestore.collection('shops').snapshotChanges();
  }

  getUserAccountFromFirebaseCloud() {
    return this.firestore.collection('users').snapshotChanges();
  }

  setAddItemsShopData(id, name, price, description, img, shopName) {
    const shopRef: AngularFirestoreDocument<any> = this.firestore.doc(`items/${id}`);
    const shopItems = {
      id, name, price, description, img, shopName
    };
    return shopRef.set(shopItems, {
      merge: true
    });
  }

  setCheckoutData(id, shopName, userName, itemName, totalPrice, address) {
    const checkoutRef: AngularFirestoreDocument<any> = this.firestore.doc(`checkout/${id}`);
    const checkout = {
      id,
      shopName,
      userName, itemName, totalPrice, address
    };
    return checkoutRef.set(checkout, {
      merge: true
    });
  }
}
