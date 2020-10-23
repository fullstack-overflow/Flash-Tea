export interface StoreAccount {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  phoneNumber?: number;
  address?: string;
}
