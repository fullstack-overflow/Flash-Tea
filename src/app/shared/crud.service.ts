import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  constructor(private firestore: AngularFirestore) { }

  getItemsFromFirebaseCloud() {
    return this.firestore.collection('items').snapshotChanges();
  }
}
