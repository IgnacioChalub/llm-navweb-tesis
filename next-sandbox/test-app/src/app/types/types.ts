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

export interface Transaction {
  id: number;
  date: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  sender?: {
    username: string;
  };
  recipient?: {
    username: string;
  };
}

export interface GraphData {
  date: string;
  balance: number;
}
