import {TransactionType} from 'src/app/types/types';

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getColor = (type: string, amount: number) => {
  if (type === TransactionType.WITHDRAWAL) {
    return 'red';
  } else if (type === TransactionType.DEPOSIT) {
    return 'green';
  } else if (type === TransactionType.TRANSFER) {
    return amount < 0 ? 'red' : 'green';
  }
  return 'inherit';
};

export const capitalizeFirstLetter = (string) => {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
};
