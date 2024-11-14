export interface ILoginBody {
  username: string;
  password: string;
}

export interface IRegisterBody {
  email: string;
  username: string;
  password: string;
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  TRANSFER = 'transfer',
}

export interface User {
  id: string;
  username: string;
  email: string;
}
